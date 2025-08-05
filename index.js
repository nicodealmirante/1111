import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'
import pino from 'pino'
import qrcode from 'qrcode-terminal'
import OpenAI from 'openai'
import fs from 'fs-extra'
import 'dotenv/config'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const assistantId = process.env.ASSISTANT_ID

const respuestas = {
  VENTA: {
    texto: "💰 Info de ventas: ¡Mirá el detalle en el PDF!",
    imagenes: ["media/venta1.jpg", "media/venta2.jpg"],
    pdfs: ["media/detalle_espejo.pdf"]
  },
  ALQUILER: {
    texto: "🏠 Info de alquileres: ¡Te paso fotos y detalle!",
    imagenes: ["media/alquiler1.jpg"],
    pdfs: ["media/detalle_alquiler.pdf"]
  },
  SOPORTE: {
    texto: "🔧 Soporte técnico: Escribinos al 11-5555-5555",
    imagenes: [],
    pdfs: []
  },
  DEFAULT: {
    texto: "🤖 No entendí, ¿querés info de Venta, Alquiler o Soporte?",
    imagenes: [],
    pdfs: []
  }
}

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const sock = makeWASocket({
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, qr }) => {
    if (qr) qrcode.generate(qr, { small: true })
    if (connection === 'open') console.log('✅ Bot conectado a WhatsApp')
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const from = m.key.remoteJid
    const text = m.message.conversation || m.message.extendedTextMessage?.text || ''

    console.log(`💬 ${from}: ${text}`)

    try {
      // 1️⃣ Consultar asistente
      const response = await openai.beta.threads.createAndRun({
        assistant_id: assistantId,
        thread: { messages: [{ role: 'user', content: text }] }
      })

      // 2️⃣ Palabra clave
      const keyword = (response.output_text || "").trim().toUpperCase()
      console.log("🔹 Palabra clave:", keyword)

      // 3️⃣ Obtener respuesta
      const resp = respuestas[keyword] || respuestas.DEFAULT

      // 4️⃣ Enviar texto
      await sock.sendMessage(from, { text: resp.texto })

      // 5️⃣ Enviar imágenes
      for (let img of resp.imagenes) {
        if (fs.existsSync(img)) {
          await sock.sendMessage(from, { image: fs.readFileSync(img), caption: "" })
        }
      }

      // 6️⃣ Enviar PDFs
      for (let pdf of resp.pdfs) {
        if (fs.existsSync(pdf)) {
          await sock.sendMessage(from, { 
            document: fs.readFileSync(pdf), 
            fileName: pdf.split('/').pop(), 
            mimetype: 'application/pdf' 
          })
        }
      }

    } catch (e) {
      console.error(e)
      await sock.sendMessage(from, { text: '❌ Error procesando tu mensaje' })
    }
  })
}

connectBot()
