require('dotenv').config()

const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const Queue = require('queue-promise')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const ServerHttp = require('./src/http')
const ChatwootClass = require('./src/chatwoot/chatwoot.class')
const { handlerMessage } = require('./src/chatwoot')

const serverHttp = new ServerHttp()
const PORT = 3003

let motivo;
let causa;

////////////////////////////////////////////////////////////////////////////////////////////
////     FUNCIONES
/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
//////////// FLUJO SPAM //////////
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// FLUJO CLIENTE
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const mywhatsa = "[5491140054474@s.whatsapp.net](mailto:5491140054474@s.whatsapp.net)"

const flujoFinalil = addKeyword('HH')
  .addAnswer('AUTORESPUESTA FINALIZADA - CONTINUE CON LA CONSULTA AL +5491140054474 - NICOLAS')

const Cliente = addKeyword(["ASESOR VENTAS"], { sensitive: true })
  .addAnswer("Continue con Nicolas al numero +5491140054474", async (ctx, { provider }) => {
    await provider.sendText(mywhatsa, `*${causa}* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
  })
  .addAnswer('+5491140054474 - NICOLAS SE COMUNICARA CON USTED', { capture: true, idle: 200000 }, async (ctx, { gotoFlow }) => {
    if (ctx?.idleFallBack) return gotoFlow(flujoFinalil)
  })

////////////////////////////// EVENTO VOICE
const audiono = addKeyword(EVENTS.VOICE_NOTE)
  .addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.')
  .addAction(async (ctx, { endFlow }) => endFlow())

///////////////////////////////////////////////////////////////// FLUJO ALQUILER
const flowsAlquiler = addKeyword(['INFO. ALQUILER'], { sensitive: true })
  .addAnswer('👌Te envio la info de alquiler.')
  .addAnswer('Espejo Mágico Selfie Mirror', { media: 'banner3.jpg' })
  .addAnswer('Plataforma 360 Super Slow', { media: 'banner.jpg' })
  .addAnswer('Selfie Mirror 360 + Selfie', { media: 'dibu.jpg' })
  .addAnswer('Showroom', { media: 'video.mp4' })
  .addAnswer('Selfie Mirror', { media: 'video2.mp4' })
  .addAnswer('Captura 360', { media: 'video360.mp4' })
  .addAnswer([
    '*VALORES*',
    '\n360 Super Slow.*',
    '\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.',
    'Los videos son filmados y compartidos en el momento ya editados escaneando un codigo QR',
    'Incluye accesorios (pistola lanza burbujas, lanza billetes.)',
    'El valor del servicio de 2 horas es de $ 100.000 .-'
  ])
  .addAnswer([
    '\n*Espejo Magico*',
    '\nValor Servicio por 2 Horas $ 100.000',
    '\nValor ambos servicios por 2 Horas $ 180.000',
    '\nEl minimo de alquiler son 2 horas',
    '\nEl valor de la Hora adicional es de $ 50.000'
  ])
  .addAnswer(['🚚El valor no incluye traslados'])
  .addAnswer("Opciones", { capture: true, buttons: [
    { body: 'INFO. ALQUILER' },
    { body: 'INFO. VENTA' },
    { body: 'ASESOR VENTAS' },
  ], delay: 2000, idle: 200000 }, async (ctx, { gotoFlow }) => {
    if (ctx.body == 'ASESOR VENTAS') causa = 'ALQUILER'
    if (ctx?.idleFallBack) return gotoFlow(flujoFinal)
  })

const flujoFinal = addKeyword('HH')
  .addAnswer('Sigue ahi? Quiere que me comunique despues? Le dejo mi telefono *+5491140054474 - NICOLAS*')

///////////////////////////////////////////////////////////////// FUNCION GETTICKET
const axios = require('axios')
let fecha, asd2, asd, res1, res2, total;

const getTicket = async (donde) => {
  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donde.replace(' ', '%20')}Argentina&origins=Ramos%20Mejia%20Buenos%20Aires%20Argentina&key=AIzaSyB-o-yLjNarKluwNV8z8IZTDhosOlM1NOw`
  }
  const response = await axios(config)
  res1 = response.data.destination_addresses[0]
  asd2 = response.data.rows[0].elements[0].duration.text
  asd = Math.round(response.data.rows[0].elements[0].distance.value / 1000)
  total = (((asd * 250) / 3000) * 3000)
}

const alquila22 = addKeyword('alquilawer', { sensitive: true })
  .addAnswer('Cual es la fecha del evento? Escriba en este formato (DD-MM-AAAA)', { capture: true }, async (ctx) => {
    fecha = ctx.body
  })
  .addAnswer('Donde sería el evento? Escriba en este formato (LOCALIDAD - PROVINCIA)', { capture: true }, async (ctx, { endFlow, provider, flowDynamic }) => {
    await getTicket(ctx.body)
    const traslados = `*TRASLADOS*\nDISTANCIA: *${Math.round(asd)}* KM \nTIEMPO: *${asd2}*\nLUGAR: *${res1}*\nVALOR: *$ ${total}*.-\n*`

    if (asd <= 200) {
      await flowDynamic(traslados)
    }

    await flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
    return endFlow()
  })

///////////////////////////////////////////////////////////////////////////////////////////FLUJO VENTA
const organizadorflow = addKeyword('UNIFILA LED', { sensitive: true })
  .addAnswer(['¡Optimiza tus espacios y atrae la atención de tus clientes con nuestros organizadores de fila con tecnología Pixel LED!\n',
    'En SELFIE MIRROR, entendemos la importancia de mantener tus espacios organizados y atractivos. Nuestros organizadores de fila no solo te ayudarán a mantener un flujo ordenado de clientes, sino que también añadirán un toque de modernidad y estilo a tu negocio.\n',
    '¿Qué hace que nuestros organizadores de fila con tecnología Pixel LED sean especiales?\n',
    '✨ Iluminación espectacular: Nuestra tecnología Pixel LED ofrece una iluminación vibrante y personalizable que destacará tu marca y creará una experiencia memorable para tus clientes.\n',
    '🧹 Organización efectiva: Mantén tus filas en orden y evita la confusión con nuestros organizadores de alta calidad. ¡El caos será cosa del pasado!\n',
    '🎨 Personalización total: Personaliza la apariencia de tus organizadores para que se adapten a tu imagen corporativa o al tema de tu negocio.\n',
    '🌟 Destaca entre la multitud: Con nuestros organizadores de fila Pixel LED, tu negocio destacará en cualquier entorno, desde eventos, ferias comerciales hasta tiendas minoristas y restaurantes.\n',
    '¡Es el momento de darle a tu negocio una ventaja competitiva!\n',
    '¡Haz que tu negocio brille con nuestros organizadores de fila Pixel LED! 💫✨ #TecnologíaLED #OrganizaciónEfectiva #AtraeClientes\n',
    '*VALORES*\n',
    '[https://filavip.ar](https://filavip.ar)'])
  .addAnswer('FILA VIP', { media: 'ledselfie.mp4' })
  .addAnswer('FOTO FILA VIP', { media: '111.jpg' })
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(`*VALOR FILA VIP* ORGANIZADORES DE FILA PIXEL 🚧 NEGRO  ◼️  PLATA 🥈  ORO  🥇 AR$ 60.000 ◼️ 85.000 🥈 95.000 🥇 SOGAS TRENZADA. CAPUCHON ⛓️  NEGRO ◼️  PLATA  🥈  ORO  🥇 AR$ 14.000 ◼️ 15.000 🥈 25.000 🥇 PACK 4 PIXEL + 2 SOGAS (NEGRO) 💲💲💲 AR$ 255.000 💲💲💲`)
  })

