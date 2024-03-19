require('dotenv').config()

const axios = require("axios");
// const Queue = require('queue-promise')
const mimeType = require('mime-types')
const fs = require('node:fs/promises');
var numberxx
const { createBot, createProvider, createFlow, addKeyword, EVENTS, ProviderClass } = require('@bot-whatsapp/bot')
const Queue = require('queue-promise')
const MetaProvider = require("@bot-whatsapp/provider/meta")
const MockAdapter = require('@bot-whatsapp/database/mock')
const ServerHttp = require('./src/http')

const ChatwootClass = require('./src/chatwoot/chatwoot.class')
const { handlerMessage } = require('./src/chatwoot')
let motivo;  

const PORT =  3001


 */

let causa


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// FLUJO CLIENTE
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const mywhatsa = "5491140054474@s.whatsapp.net";

const Cliente = addKeyword(["ASESOR VENTAS"],{sensitive:true})
  .addAnswer('Entendido ', {capture: false}, // idle: 2000 = 2 segundos
      async (ctx, { gotoFlow, inRef,provider,flowDynamic }) => {
     await provider.sendtext(mywhatsa, `*${causa}* \nNumero: +${ctx.from}\nEncriptado: +${numberxx}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
  
    //  await provider.sendtext(573504607650, `*${causa}* \nNumero: +${ctx.from}\nEncriptado: +${numberxx}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
  }
      )
  .addAnswer(`Lo comunico.`,{capture: true,
       idle: 200000 }, // idle: 2000 = 2 segundos
      async (ctx, { gotoFlow, inRef,provider }) => {
          
     if (ctx?.idleFallBack) {
              return gotoFlow(flujoFinalil)
          }    
              }
      )
  //const flujoFinalil = addKeyword('HH').addAnswer('AUTORESPUESTA FINALIZADA - CONTINUE CON LA CONSULTA AL +5491140054474 - NICOLAS')

const flujoFinalil = addKeyword('HH').addAnswer('ASESOR RESPONDIENDO A CONTINUACION')




//////////////////////////////zx</////////////////////////////////// EVENTO VOICE

const audiono = addKeyword(EVENTS.VOICE_NOTE)
  .addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.')
  .addAction(async(ctx, {gotoFlow,endFlow}) => { 
return endFlow(Menuflow)})

///////////////////////////////////////////////////////////////// FLUJO ALQUILER


const flowsAlquiler = addKeyword(['INFO. ALQUILER'], {sensitive: true})
.addAnswer('👌Te envio la info de alquiler.')

//ESPEJO
.addAnswer(['*El Espejo Mágico Selfie Mirror: Transforma tus Eventos en Experiencias Inolvidables*',
'En Selfie Mirror, hemos fusionado tecnología y entretenimiento para brindarte una experiencia única en tus eventos. Con nuestro servicio de alquiler del Espejo Mágico Selfie Mirror, tu celebración se transforma en una ocasión inolvidable.',
'Nuestro Espejo Mágico no es solo un dispositivo, es una obra de arte por derecho propio. Su diseño elegante y moderno añade una dosis de sofisticación a cualquier evento, desde bodas y cumpleaños hasta fiestas corporativas.',
'Ofrecemos un software personalizado que te permite personalizar cada aspecto de las fotos. Desde plantillas de diseño exclusivas hasta efectos especiales y opciones de impresión a medida, puedes dar rienda suelta a tu creatividad.',
'Nuestra colección de accesorios y elementos de decoración es diversa y emocionante. Desde sombreros y anteojos extravagantes hasta pizarras con mensajes ingeniosos, tus invitados pueden transformarse y crear recuerdos únicos.',
'Sin restricciones en la cantidad de fotos que pueden tomarse durante el tiempo de alquiler, cada sonrisa, pose y momento especial se pueden capturar y recordar.',
'El Espejo Mágico ofrece la emoción de las impresiones instantáneas. Tus invitados pueden llevarse recuerdos físicos que atesorarán durante años.',
'Nuestro equipo se encarga del montaje y desmontaje del Espejo Mágico, lo que te permite relajarte y disfrutar del evento. Además, un técnico capacitado está presente durante todo el evento para garantizar que todo funcione sin problemas y para ayudar a los invitados.',
'Todas las fotos se almacenan digitalmente y se proporciona acceso a una galería en línea. Tus invitados pueden descargar sus fotos en cualquier momento.',
'El tiempo de alquiler se adapta a tus necesidades. El alquiler mínimo es de 2 horas, pero puedes extenderlo según tus preferencias.',
'En Selfie Mirror, nuestra pasión es hacer que tu evento sea inolvidable. Ya sea una boda emocionante, un cumpleaños especial o una reunión corporativa, el Espejo Mágico Selfie Mirror agrega un toque mágico a cada ocasión. Contáctanos hoy para obtener más información, disponibilidad y precios. ¡Haz que tus momentos especiales brillen con el Espejo Mágico Selfie Mirror!'])


.addAnswer('Espejo Mágico Selfie Mirror', {
media: 'banner3.jpg'})


.addAnswer(['*Alquiler de Plataforma 360: Eleva la Experiencia de tus Eventos Sociales*',
'En Selfie Mirror, te ofrecemos la oportunidad de llevar la diversión y la emoción de la fotografía y video a un nivel completamente nuevo con nuestra Plataforma 360. Ya no se trata solo de capturar momentos, se trata de crear experiencias memorables.',
'Nuestra Plataforma 360 te brinda la oportunidad de sorprender a tus invitados con un servicio de alquiler único y emocionante. ¿Qué puedes esperar?',
'1. **360 Grados de Diversión**:',
'Imagina poder capturar todos los ángulos de diversión en tu evento. Nuestra plataforma 360 grados registra cada sonrisa, cada risa y cada gesto especial desde todos los ángulos. Tus invitados se convierten en estrellas en un set de grabación en 360 grados.',
'2. **Edición Instantánea**:',
'Lo que hace que nuestra plataforma 360 sea aún más especial es la edición en tiempo real. Los videos son filmados y compartidos en el momento, ya editados automáticamente. Esto significa que tus invitados pueden disfrutar de la emoción de ver sus momentos especiales de inmediato.',
'3. **Accesorios Divertidos**:',
'No hay diversión sin accesorios, ¿verdad? Ofrecemos una amplia variedad de accesorios, desde pelucas y anteojos extravagantes hasta pistolas lanzaburbujas y cotillón. Tus invitados pueden elegir sus accesorios y transformarse en personajes únicos.',
'4. **Flexibilidad en el Tiempo**:',
'El tiempo de alquiler de la Plataforma 360 es flexible y se adapta a las necesidades de tu evento. Puedes contratarla por un mínimo de 2 horas, asegurándote de que tus invitados tengan suficiente tiempo para divertirse y crear recuerdos inolvidables.',
'En Selfie Mirror, nos apasiona llevar la diversión y la innovación a tus eventos sociales. Ya sea una fiesta de cumpleaños, una boda o cualquier ocasión especial, la Plataforma 360 agrega una dimensión emocionante que tus invitados recordarán. Contáctanos hoy para obtener más información, disponibilidad y precios. ¡Haz que tus eventos sociales sean inolvidables con la Plataforma 360 de Selfie Mirror!'])

.addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'})
.addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})


.addAnswer('Showroom', {media: 'video.mp4'})
.addAnswer('Selfie Mirror', {media: 'video2.mp4'})
.addAnswer('Captura 360', {media: 'video360.mp4'})


.addAnswer(['  *VALORES* ',
'\n360 Super Slow.*',
'\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.',
'Los videos son filmados y compartidos en el momento ya editados escaneando un codigo QR',
'Incluye accesorios (pistola lanza burbujas, lanza billetes.)',
'El valor del servicio de 2 horas es de $ 130.000 .-'])
.addAnswer(['\n*Espejo Magico*',
'\nValor Servicio por 2 Horas $ 130.000',
'\nValor ambos servicios por 2 Horas $ 250.000',
'\nEl minimo de alquiler son 2 horas',
'\nEl valor de la Hora adicional es de $ 75.000'])
.addAnswer(['🚚El valor no incluye traslados'])




    .addAnswer("Opciones", {capture: true, 
      buttons: [
          {body: 'INFO. ALQUILER'},
          {body: 'INFO. VENTA'},
         {body: 'ASESOR VENTAS'},
        ], delay: 2000 , idle: 200000 }, // idle: 2000 = 2 segundos
        async (ctx, { gotoFlow, inRef }) => {
          if(ctx.body=='ASESOR VENTAS') {
            causa='ALQUILER'
        }
            if (ctx?.idleFallBack) {
                return gotoFlow(flujoFinal)
            }
        }
        )

    const flujoFinal = addKeyword('HH').addAnswer('Lo traslado con un agente?')



  const flowVenta = addKeyword(['INFO. VENTA'], { sensitive: true })
  .addAnswer('👌 Te envío la info de Venta.')
 
  .addAnswer(['*Espejo Mágico Selfie Mirror*',
            '\nEl Espejo Mágico de Selfie Mirror cuenta con una cámara web de alta calidad, vidrio templado resistente, una Mini PC y un',
            'televisor LED de 32 pulgadas. Estas características garantizan una experiencia de alta definición para capturar momentos',
            'especiales.',
           '\nSu diseño compacto y portátil, con dimensiones de 126 cm de alto x 70 cm de ancho y 20 cm de profundidad en el modelo',
           'Slim, permite transportarlo fácilmente en cualquier vehículo. Esto brinda una gran versatilidad y conveniencia para eventos ',
            'y fiestas.'],{delay: 2000})
  
  .addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'})
 
  .addAnswer(['La facilidad de uso es una de las ventajas clave del Espejo Mágico. Simplemente tienes que enchufarlo y presionar el ',
              'botón de encendido para que empiece a funcionar. Esto agiliza la instalación y permite que los eventos comiencen rápidamente.',
            '\nEs importante mencionar que el Selfie Mirror no incluye una impresora, pero está preparado para funcionar con cualquier ',
            'impresora que se adapte a las necesidades del cliente. Esto brinda flexibilidad para elegir la impresora que mejor se ajuste a',
            'los requerimientos de impresión.',
           '\nEn cuanto al precio, el valor del equipo es de 1700 dólares o pesos al valor del dólar blue del día.'])
                                    
    

   
            
  .addAnswer('Equipo Slim Selfie Mirror', {media: 'banner4.jpg'})
  
  .addAnswer(['*Plataforma 360 Super Slow*',
  '\nNuestra plataforma incluye todo lo necesario para poder brindar un servicio profesional. Incluye Monitor transmitiendo en vivo. Proceso de editado automatico.',
  ' (Una vez grabado se reproduce en el monitor automaticamente ya editado)',
  'Los invitados podran escanear un codigo QR UNICO para poder visualizar todos los videos del evento *EN EL MOMENTO*',
          '\nLa plataforma controlada por mando a distancia incluye: variador de velocidad, arranque y parada suave, soporte reforzado, Aro de Led, 4 bastones led pixel de 1 mt, led rgb en plataforma, stand para TV (no incluida) y asesoramiento tecnico.',
         '\n*Equipo listo para trabajar*.',
        'El valor del equipo es de 1700 U$S.' ,
        '▶ REQUERIDO:Necesita contar con un Apple Iphone 13 o suoperior (dispositivo de grabacion)',
  'y un TV LED de 32 o mas (monitoreo)'])

  .addAnswer('Selfie Mirror', {media: 'video3.mp4'})
  
  .addAnswer('Formas de pago: efectivo, transferencia/depósito')

  .addAnswer('Selfie Mirror', {media: 'banner3.jpg'})


  .addAnswer(['*UNIFILA LED*\n¡Optimiza tus espacios y atrae la atención de tus clientes con nuestros organizadores de fila con tecnología Pixel LED!\n',
  'En SELFIE MIRROR, entendemos la importancia de mantener tus espacios organizados y atractivos. Nuestros organizadores de fila no solo te ayudarán a mantener un flujo ordenado de clientes, sino que también añadirán un toque de modernidad y estilo a tu negocio.\n',
  '¿Qué hace que nuestros organizadores de fila con tecnología Pixel LED sean especiales?\n',
  '✨ Iluminación espectacular: Nuestra tecnología Pixel LED ofrece una iluminación vibrante y personalizable que destacará tu marca y creará una experiencia memorable para tus clientes.\n',
  '🧹 Organización efectiva: Mantén tus filas en orden y evita la confusión con nuestros organizadores de alta calidad. ¡El caos será cosa del pasado!\n',
  '🎨 Personalización total: Personaliza la apariencia de tus organizadores para que se adapten a tu imagen corporativa o al tema de tu negocio.\n',
  '🌟 Destaca entre la multitud: Con nuestros organizadores de fila Pixel LED, tu negocio destacará en cualquier entorno, desde eventos, ferias comerciales hasta tiendas minoristas y restaurantes.\n',
  '¡Es el momento de darle a tu negocio una ventaja competitiva!\n',
  '¡Haz que tu negocio brille con nuestros organizadores de fila Pixel LED! 💫✨ #TecnologíaLED #OrganizaciónEfectiva #AtraeClientes\n',
  '*VALORES*\n',
  'https://filavip.ar'])
   .addAnswer('FILA VIP', {media: 'ledselfie.mp4'})
  .addAnswer('FOTO FILA VIP', {media: '111.jpg'})
 

  .addAnswer('Selfie Mirror', {media: 'banner3.jpg'})
 
  .addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})

  .addAnswer('Showroom', {media: 'video.mp4', delay: 4000})
  .addAnswer('Selfie Mirror', {media: 'video2.mp4'})
  .addAnswer('Captura 360', {media: 'video360.mp4', delay: 2000},)
  .addAnswer('UNIFILAS FOTO',{
    media: 'colum1.jpg', delay: 3000})
    .addAnswer('UNIFILAS',{
      media: 'colum2.mp4', delay: 3000})
      .addAnswer('FICHA TECNICA',
        {
            body:'PDF',
media:"FichaTecnicaFULL.pdf"
        })
  
        .addAnswer('Selfie Mirror',{
          media: 'colum4.mp4', delay: 3000})
  .addAnswer('✈️ *Enviamos a todo el País*.', { capture: false }, async (ctx, { flowDynamic,gotoFlow, endFlow }) => {
  let dolar
  await fetch('https://dolarapi.com/v1/dolares/blue')
  .then(response => response.json())
  .then(json => dolar = json.venta)
  console.log('VENTA')
  await flowDynamic(`*VALORES*\n   *ESPEJO MAGICO* \n  💵   *U$D 1.700 .-*   🔒 \n 💱 > U$D = AR$ > 💱 \n 📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1700)} .-🔓 `,)
  await flowDynamic(`\n\n*PLATAFORMA 360*\n  💵   *U$D 1.500 .-*   🔒 \n  💱 > U$D = AR$ > 💱\n  📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓`,)
  await flowDynamic(`Cotizacion actual: \n💱[1 U$S = AR ${dolar}.-]💱` ,)
  await flowDynamic( `\n\n*FILA VIP*\n  ORGANIZADORES DE FILA PIXEL\n  🚧 💲💲💲 75 USD  💲💲💲 🥇\n ⛓️ ${new Intl.NumberFormat('es-MX').format(dolar*75)}\n  SOGAS TRENZADA\n  💲💲💲  20 USD 💲💲💲 \n  ⛓️ ${new Intl.NumberFormat('es-MX').format(dolar*20)} ⛓️ `)
  


})
.addAnswer("Opciones", {capture: true, 
  buttons: [
      {body: 'INFO. ALQUILER'},
      {body: 'INFO. VENTA'},
     {body: 'ASESOR VENTAS'},
    ], delay: 2000 , idle: 200000 }, // idle: 2000 = 2 segundos
    async (ctx, { gotoFlow, inRef }) => {
      if(ctx.body=='ASESOR VENTAS') {

      causa='VENTA'
            }
                  if (ctx?.idleFallBack) {
            return gotoFlow(flujoFinal)
        }
    }
    )

//////////////////////////////////////////////////////////////// EVENTO WELCOME


 //////////////////////////////////////////////////////////////// EVENTO WELCOME




  const flowPrincipal = addKeyword(EVENTS.WELCOME)

  .addAnswer("Hola. Soy Luna, una IA encargada de responder instantaneamente preguntas frecuentes. Para hablar con un asesor humano toque el boton correspondiente.")
    
  .addAnswer('Selfie Mirror', {media: 'banner22.jpg'})
    .addAnswer('UNIFILAS',{
      filename: 'colum3.mp4', delay: 3000})
  .addAnswer("Opciones", {capture: true, 
      buttons: [
          {body: 'INFO. ALQUILER'},
          {body: 'INFO. VENTA'},
         {body: 'ASESOR VENTAS'},
        ], delay: 2000 , idle: 200000 }, // idle: 2000 = 2 segundos
        async (ctx, { gotoFlow, inRef }) => {
          if(ctx.body=='ASESOR VENTAS') {

          causa='WELCOME'
          }
          if (ctx?.idleFallBack) {
                return gotoFlow(flujoFinal)
            }
        }
        )
 



  /////////////////////////////////////////////////////////////////////////  FLUJO MENU
  
  const Menuflow = addKeyword(["me-nu"], { sensitive: true })

  .addAnswer("*Info*", { 
            capture: true,
            buttons: [
                {body: 'INFO. ALQUILER'},
                {body: 'INFO. VENTA'},
             {body: 'ASESOR VENTAS'},
            ],
          }
) 

 */
////////////////////////////////////////////////////////////////////////////////////////

const serverHttp = new ServerHttp(PORT)

const chatwoot = new ChatwootClass({
    account: process.env.CHATWOOT_ACCOUNT_ID,
    token: process.env.CHATWOOT_TOKEN,
    endpoint: process.env.CHATWOOT_ENDPOINT
});

const queue = new Queue({
    concurrent: 1,
    interval: 500
});

// Función para descargar archivos adjuntos de los mensajes
const downloadMediaMessage = async (ctx) => {
    try {
        const response = await axios.get(ctx.url, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${process.env.jwtToken}`
            }
        });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error(`Error al descargar el medio: ${error}`);
        throw error;
    }
};

// Función para manejar mensajes entrantes del proveedor
const handleIncomingMessage = async (payload) => {
    // Tu lógica de manejo de mensajes entrantes aquí
    console.log("payload", payload);
    // Más lógica...
};

// Función para manejar mensajes salientes del bot
const handleOutgoingMessage = async (payload) => {
    // Tu lógica de manejo de mensajes salientes aquí
    console.log("payload11111111111111", payload);
    // Más lógica...
};

// Evento para manejar mensajes entrantes del proveedor
adapterProvider.on("message", async (payload) => {
    try {
        // Tu lógica de manejo de mensajes entrantes aquí
        await handleIncomingMessage(payload);
    } catch (err) {
        console.log("Error al manejar mensaje entrante:", err);
    }
});

// Evento para manejar mensajes salientes del bot
bot.on('send_message', async (payload) => {
    try {
        // Tu lógica de manejo de mensajes salientes aquí
        await handleOutgoingMessage(payload);
    } catch (err) {
        console.log("Error al manejar mensaje saliente:", err);
    }
});

// Función principal
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowVenta, flowsAlquiler, Menuflow, Cliente]);
    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.jwtToken,
        numberId: process.env.numberId,
        verifyToken: 'A1234',
        version: 'v18.0',
    });

    const bot = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    serverHttp.initialization(bot);
};

// Ejecución de la función principal
main();

