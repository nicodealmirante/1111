import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'
import pino from 'pino'
import qrcode from 'qrcode-terminal'
import OpenAI from 'openai'
import 'dotenv/config'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const assistantId = process.env.ASSISTANT_ID

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const sock = makeWASocket({
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) qrcode.generate(qr, { small: true })
    if (connection === 'open') console.log('✅ Bot conectado a WhatsApp')
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const from = m.key.remoteJid
    const text = m.message.conversation || m.message.extendedTextMessage?.text || ''

    console.log(`💬 ${from}: ${text}`)

    // Enviar a OpenAI Assistant
    try {
      const response = await openai.beta.threads.createAndRun({
        assistant_id: assistantId,
        thread: { messages: [{ role: 'user', content: text }] }
      })

      const reply = response.output_text || '🤖 No tengo respuesta en este momento.'
      await sock.sendMessage(from, { text: reply })
    } catch (e) {
      console.error(e)
      await sock.sendMessage(from, { text: '❌ Error con OpenAI' })
    }
  })
}

connectBot()
