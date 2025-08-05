import baileys from '@whiskeysockets/baileys'
import pino from 'pino'
import qrcode from 'qrcode-terminal'
import qrcodeImage from 'qrcode'
import OpenAI from 'openai'
import fs from 'fs-extra'
import fetch from 'node-fetch'
import 'dotenv/config'

const { default: makeWASocket, useMultiFileAuthState } = baileys

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

fs.ensureDirSync('session')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const assistantId = process.env.ASSISTANT_ID

// Diccionario de respuestas
const respuestas = {
  VENTA: { texto: "💰 Info de ventas", imagenes: [], pdfs: [] },
  ALQUILER: { texto: "🏠 Info de alquileres", imagenes: [], pdfs: [] },
  SOPORTE: { texto: "🔧 Soporte técnico 11-5555-5555", imagenes: [], pdfs: [] },
  DEFAULT: { texto: "🤖 Venta, Alquiler o Soporte?", imagenes: [], pdfs: [] }
}

async function uploadQR(data) {
  const res = await fetch('https://file.io/?expires=1d', {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/octet-stream' }
  })
  const json = await res.json()
  return json.link || '❌ No se pudo subir QR'
}

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async ({ connection, qr }) => {
    if (qr) {
      // 1️⃣ Mostrar en consola
      qrcode.generate(qr, { small: true })

      // 2️⃣ Generar PNG temporal
      const qrPng = await qrcodeImage.toBuffer(qr)

      // 3️⃣ Subir QR remoto
      const link = await uploadQR(qrPng)
      console.log("🔗 Escaneá el QR remoto:", link)
    }

    if (connection === 'open') console.log('✅ Bot conectado a WhatsApp')
    if (connection === 'close') console.log('❌ Conexión cerrada, reintentando...')
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const from = m.key.remoteJid
    const text = m.message.conversation || m.message.extendedTextMessage?.text || ''

    console.log(`💬 ${from}: ${text}`)

    try {
      const response = await openai.beta.threads.createAndRun({
        assistant_id: assistantId,
        thread: { messages: [{ role: 'user', content: text }] }
      })

      const keyword = (response.output_text || "").trim().toUpperCase()
      console.log("🔹 Palabra clave:", keyword)

      const resp = respuestas[keyword] || respuestas.DEFAULT
      await sock.sendMessage(from, { text: resp.texto })

    } catch (e) {
      console.error(e)
      await sock.sendMessage(from, { text: '❌ Error procesando tu mensaje' })
    }
  })
}

connectBot()

// Mantener vivo
setInterval(() => console.log("🤖 Bot vivo en Railway"), 60000)
