import baileys from '@whiskeysockets/baileys'
import pino from 'pino'
import qrcode from 'qrcode-terminal'
import qrcodeImage from 'qrcode'
import OpenAI from 'openai'
import fs from 'fs-extra'
import fetch from 'node-fetch'
import 'dotenv/config'

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = baileys

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

// 🔹 Config OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const assistantId = process.env.ASSISTANT_ID

// 🔹 Diccionario de respuestas
const respuestas = {
  VENTA: { texto: "💰 Info de ventas", imagenes: [], pdfs: [] },
  ALQUILER: { texto: "🏠 Info de alquileres", imagenes: [], pdfs: [] },
  SOPORTE: { texto: "🔧 Soporte técnico 11-5555-5555", imagenes: [], pdfs: [] },
  DEFAULT: { texto: "🤖 Venta, Alquiler o Soporte?", imagenes: [], pdfs: [] }
}

// 🔹 Sube QR remoto y devuelve link
async function uploadQR(data) {
  try {
    const res = await fetch('https://file.io/?expires=1d', {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/octet-stream' }
    })
    const json = await res.json()
    return json.link || '❌ No se pudo subir QR'
  } catch {
    return '❌ Error subiendo QR remoto'
  }
}

// 🔹 Inicia el bot
async function connectBot() {
  // Borrar sesión corrupta si existe archivo en lugar de carpeta
  if (fs.existsSync('session') && !fs.lstatSync('session').isDirectory()) {
    fs.removeSync('session')
  }
  fs.ensureDirSync('session')

  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      // QR en consola
      qrcode.generate(qr, { small: true })

      // QR remoto
      const qrPng = await qrcodeImage.toBuffer(qr)
      const link = await uploadQR(qrPng)
      console.log("🔗 Escaneá el QR remoto:", link)
    }

    if (connection === 'open') console.log('✅ Bot conectado a WhatsApp')

    if (connection === 'close') {
      const reason = new baileys.DisconnectReason(
        lastDisconnect?.error?.output?.statusCode || 0
      )
      console.log('❌ Conexión cerrada:', reason)
      throw new Error('Conexión cerrada, reiniciando...')
    }
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

// 🔹 Bucle de reconexión infinita
async function start() {
  try {
    await connectBot()
  } catch (err) {
    console.error("💥 Error fatal:", err.message)
    console.log("♻️  Reintentando en 5s...")
    setTimeout(start, 5000)
  }
}

start()

// Mantener vivo Railway
setInterval(() => console.log("🤖 Bot vivo en Railway"), 60000)
