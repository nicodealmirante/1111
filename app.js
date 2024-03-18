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

/** * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

let causa






////////////////////////////////////////////////////////////////////////////////////////////
////     FUNCIONES
/////////////////////////////////////////////////////////////////////////////////////////
/**
 function numero(nnum){
let nuevoContenido = `\n${nnum}`;
  fs.appendFile('numeros.txt', nuevoContenido, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
          console.log('Numero Agendado de Venta');
  }
  function numero2(nnum){
    let nuevoContenido = `\n${nnum}`;
fs.appendFile('numerosalquiler.txt', nuevoContenido, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
console.log('Numero Agendado de Alquiler');*/ 
////////////////////////////////////////////////////////////////////////////////////////
//////////// FLUJO SPAM //////////
////////////////////////////////////////////////////////////////////////////////////////////


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



  /** 
})
         
    .addAnswer("ESTE CHAT AUTOMATICO A FINALIZADO. NOS PONDREMOS EN CONTACTO CON USTED", {capture:true, delay:5000}, async (ctx ,{gotoFlow,endFlow,provider,fallBack}) => {
          if(ctx.body == "SM" ||ctx.body == "Sm" || ctx.body == "sm"){
               return gotoFlow(Menuflow),
              endFlow()}
    const mywhatsa = "5491140054474@s.whatsapp.net";
    await provider.sendtext(mywhatsa, `SIG MSJ\nNumero: +${ctx.from}\nINFO: *${ctx.body}*`) 
     return fallBack("Gracias por comunicarse con nosotros. Escriba *SM* para volver al menu inicial")
  }) 
*/

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

/* 
if(ctx.body == 'CONTINUAR CON AGENTE'){
  return gotoFlow(Cliente)
} else if(ctx.body == 'VOLVER AL MENU') {
 return gotoFlow(Menuflow)}
  else if (ctx.body == 'FINALIZAR') {
   await flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
return endFlow()
}}
 
    let fecha
    let asd2;
let asd;
var res1;
var res2;
var total;
 const getTicket = async (donde) => {

    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donde.replace(' ','%20')}Argentina&origins=Ramos%20Mejia%20Buenos%20Aires%20Argentina&key=AIzaSyB-o-yLjNarKluwNV8z8IZTDhosOlM1NOw`,
    };
    const response = await axios(config)
    res1 = response.data["destination_addresses"][0]
    asd2 = response.data["rows"][0]["elements"][0]["duration"].text
    asd = Math.round(response.data["rows"][0]["elements"][0]["distance"].value/1000)
total=(((asd*250)/3000)*3000)}

 

const alquila22 = addKeyword('alquilawer',{sensitive:true})  

.addAnswer('Cual es la fecha del evento? Escriba en este formato (DD-MM-AAAA)', {capture: true}, async(ctx,{}) => {fecha=ctx.body})
.addAnswer('Donde sería el evento? Escriba en este formato (LOCALIDAD - PROVINCIA)', {capture:true}, async (ctx, { endFlow, provider, flowDynamic}) => {
await getTicket(ctx.body)
var traslados = `*TRASLADOS*\nDISTANCIA: *${Math.round(asd)}* KM \nTIEMPO: *${asd2}*\nLUGAR: *${res1}*\nVALOR: *$ ${total}*.-\n*`

if((asd)<=200){
  await flowDynamic(traslados)
}a



await flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
return endFlow(Menuflow)})
/////////////////////////////////////////////////////////////////////////////////////////// FLUJO VENTA
const organizadorflow = addKeyword('UNIFILA LED',{sensitive:true})
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
'https://filavip.ar'])
.addAnswer('FILA VIP', {media: 'ledselfie.mp4'})
.addAnswer('FOTO FILA VIP', {media: '111.jpg'})
.addAction(async (ctx, { gotoFlow,flowDynamic}) => {
  await  flowDynamic([`*VALOR FILA VIP*\n
  ORGANIZADORES DE FILA PIXEL\n
    🚧 NEGRO  ◼️  PLATA 🥈  ORO  🥇 \n
   AR$ 60.000 ◼️ 85.000 🥈 95.000 🥇\n
  SOGAS TRENZADA. CAPUCHON\n
   ⛓️  NEGRO ◼️  PLATA  🥈  ORO  🥇\n
  AR$ 14.000 ◼️ 15.000 🥈 25.000 🥇\n
   PACK 4 PIXEL + 2 SOGAS (NEGRO)\n
  💲💲💲 AR$ 255.000 💲💲💲`])
  .addAnswer('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')

 return gotoFlow(Menuflow)
}
)*/ 

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
/** .addAnswer("*CONTINUAR*", { 
      capture: true,
      buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
      ], delay: 2000
  }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {

if (ctx.body == 'CONTINUAR CON AGENTE') {

  await provider.sendtext(mywhatsa, `*VENTA* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
await  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
return gotoFlow(Menuflow)
return endFlow(flowVenta)

} else if (ctx.body == 'VOLVER AL MENU') {

 return gotoFlow(Menuflow)
 return endFlow(flowVenta)

  } else if (ctx.body == 'FINALIZAR') {
  await  flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
return endFlow()
}}
)        
   

.addAnswer("*INFO*", { 
  capture: true,
  buttons: [
      {body: 'INFO. ALQUILER'},
      {body: 'INFO. VENTA'},
      {body: 'UNIFILA LED'},
  ], delay: 5000}
) .addAnswer("Contacto", { 
  capture: true,
  buttons: [
      {body: 'HABLAR CON ASESOR'},
      {body: 'INFO DE LA EMPRESA'},
      {body: 'PAGINA WEB'},
  ],
delay: 2000 }, async (ctx, { fallBack, gotoFlow, provider, flowDynamic}) => {

if (ctx.body == 'PAGINA WEB') {
flowDynamic('https://www.espejoselfiemirror.com.ar')        
    gotoFlow(Menuflow);
} else if (ctx.body == 'HABLAR CON ASESOR') {
nombre = "Cliente"
return gotoFlow(Cliente)
} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})

return  gotoFlow(Menuflow);
}});
*/
 //////////////////////////////////////////////////////////////// EVENTO WELCOME




  const flowPrincipal = addKeyword(EVENTS.WELCOME)

  .addAnswer("Hola. Soy Luna, una IA encargada de responder instantaneamente preguntas frecuentes. Para hablar con un asesor humano toque el boton correspondiente."")
    
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
 

    /*
    .addAnswer("*Contacto*", { 
      capture: true,
      buttons: [
        {body: 'INFO DE LA EMPRESA'},
          {body: 'PAGINA WEB'},
      ],
   delay: 3000 }, async (ctx, { fallBack, gotoFlow, adapterProvider, flowDynamic}) => {

if (ctx.body == 'PAGINA WEB') {
await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
await flowDynamic('FILA VIP \nhttps://filavip.ar')  
       return gotoFlow(Menuflow);
} else if (ctx.body == 'HABLAR CON ASESOR') {
  await flowDynamic('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')


} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})

return  gotoFlow(Menuflow);
}});
          
    
 /**   {capture: true},async (ctx, {provider}) => {

curl 'https://graph.facebook.com/v18.0/106540352242922/messages' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer EAAJB...' \
-d '{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "+16505555555",
    "type": "interactive",
    "interactive": {
        "type": "cta_url",
        "header": {
            "text": "Available Dates"
        },
        "body": {
            "text": "Tap the button below to see available dates."
        },
        "footer": {
            "text": "Dates subject to change."
        },
        "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "See Dates",
                "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
            }
        }
    }
}'



  
            const headerText = 'MENU'
            const bodyText = 'Informacion y Precios'
            const footerText = 'Seleccione'
            const buttonList = 'Lista'
            const listParams = [
                {
                   "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "See Dates",
                "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
            }
                        {
                            id: 'ID_2',
                            title: 'FilaVip',
                            description: 'Organizadores de fila LED'
                        },
                        {
                            id: 'ID_3',
                            title: 'Plataforma 360 Super Slow',
                            description: 'Plataforma con camara giratoraia'
                        }
                    ]
                },
                {
                    title: 'ALQUILER',
                    rows: [
                        {
                            id: 'ID_1',
                            title: 'Selfie Mirror',
                            description: 'Espejo Magico'
                        },
                        {
                            id: 'ID_2',
                            title: 'Plataforma 360 Super Slow',
                            description: 'Plataforma con camara giratoraia'
         } ] },
                        {
                          title: 'Empresa',
                          rows: [
                              {
                                  id: 'ID_1',
                                  title: 'Ubicacion',
                                  description: 'Ubicacion y Horarios'
                              },
                              {
                                  id: 'ID_2',
                                  title: 'Sitio Web',
                                  description: 'Paginas de productos'
                              }
                  
                    ]
                }
  
            const headerText = 'MENU'
            const bodyText = 'Informacion y Precios'
            const footerText = 'Seleccione'
            const buttonList = 'Lista'
            const listParams = [
                {
                   "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "See Dates",
                "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
            }
            ]
            await provider.sendList(ctx.from, headerText, bodyText, footerText, buttonList ,listParams)
        }
        

*/

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
/*
.addAnswer("*CONTACTO*", { 
  capture: true,
  buttons: [
      {body: 'HABLAR CON ASESOR'},
      {body: 'INFO DE LA EMPRESA'},
      {body: 'adadsdd', url: "https://wa.me/541166704322"},
  ],
delay: 2000 }, async (ctx, { fallBack, gotoFlow, provider, flowDynamic}) => {
if (ctx.body == 'PAGINA WEB') {
  await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
  await flowDynamic('FILA VIP \nhttps://filavip.ar')  
    gotoFlow(Menuflow);
} else if (ctx.body == 'HABLAR CON ASESOR') {
nombre = "Cliente"
return gotoFlow(Cliente)
} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})

return  gotoFlow(Menuflow);
}   })


  const Menuflow2 = addKeyword(["me-?nu"], { sensitive: true })

  
     .addAnswer("Menu", { 
                      capture: true,
                      buttons: [
                          {body: 'HABLAR CON ASESOR'},
                          {body: 'INFO DE LA EMPRESA'},
                          {body: 'PAGINA WEB'},
                      ],
                   delay: 2000 }, async (ctx, { gotoFlow, provider, flowDynamic}) => {
              
              if (ctx.body == 'PAGINA WEB') {
                await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  

                await flowDynamic('FILA VIP \nhttps://filavip.ar')  
                      return  gotoFlow(Menuflow);
      } else if (ctx.body == 'HABLAR CON ASESOR') {
         nombre = "Cliente"
         return gotoFlow(Cliente)
      } else if (ctx.body == 'INFO DE LA EMPRESA') {
       await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
       await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
   
       await flowDynamic('Selfie Mirror', {media: 'video.mp4'})
      
      return  gotoFlow(Menuflow);
         } 
        });
        
 */
////////////////////////////////////////////////////////////////////////////////////////

const serverHttp = new ServerHttp(PORT)

const chatwoot = new ChatwootClass({
  account: process.env.CHATWOOT_ACCOUNT_ID,
  token: process.env.CHATWOOT_TOKEN,
  endpoint: process.env.CHATWOOT_ENDPOINT
})
    
    const queue = new Queue({
        concurrent: 1,
        interval: 500 
    })
    
    const main = async () => {
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal, flowVenta, flowsAlquiler, Menuflow,Cliente])

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
        })
    
    serverHttp.initialization(bot)
        /**
         * Los mensajes entrantes al bot (cuando el cliente nos escribe! <---)
         */



    
  const downloadMediaMessage = async (ctx) => {
      console.log("qqqqqqqqqqqq",ctx)
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


  adapterProvider.on("message", (payload) => {
    console.log("payload", payload);


    const numberPayload = payload.from

    const crypto = require('crypto');


    
    function generarClaveIV() {
    
      const clave = crypto.createHash('sha256').update('clave_secreta').digest(); 
      const iv = Buffer.alloc(16, 0); // IV fijo
    
      return { clave, iv };
    }
    
    function encriptar(numero, clave, iv) {
     
      const numeroStr = numero.toString();
    
     
      const cifrador = crypto.createCipheriv('aes-256-cbc', clave, iv);
    
     
      let numeroEncriptado = cifrador.update(numeroStr, 'utf-8', 'hex');
      numeroEncriptado += cifrador.final('hex');
    
      
      return numeroEncriptado;
    }
    
    function desencriptar(numeroEncriptado, clave, iv) {
     
      const descifrador = crypto.createDecipheriv('aes-256-cbc', clave, iv);
    
   
      let numeroDesencriptado = descifrador.update(numeroEncriptado, 'hex', 'utf-8');
      numeroDesencriptado += descifrador.final('utf-8');
    
      return numeroDesencriptado;
    }
    
    
    const { clave, iv } = generarClaveIV();
    
   
    const numeroEncriptado = encriptar(numberPayload, clave, iv);
    console.log('Número Encriptado123:', numeroEncriptado);
    
  
    const numeroDesencriptado = desencriptar(numeroEncriptado, clave, iv);
    console.log('Número Desencriptado:', numeroDesencriptado);
    







    function obtenerPrimerosDoceNumeros(cadena) {
      // Filtrar solo los dígitos numéricos
      let soloNumeros = cadena.replace(/\D/g, '');
    
      // Utiliza la función slice para extraer los primeros 12 dígitos
      let primerosDoceNumeros = soloNumeros.slice(0, 12);
      return primerosDoceNumeros;
    }
    
    // Ejemplo de uso
    let cadenaOriginal = numeroEncriptado ;
    let primerosDoceNumeros = obtenerPrimerosDoceNumeros(cadenaOriginal);
    
    
    

    let cadenaNumerica = primerosDoceNumeros.toString();

    // Convertir la cadena en un array de caracteres, invertir el array y unir los caracteres nuevamente
    var nuevoOrden = "1" + cadenaNumerica.split('').reverse().join('');
    
    console.log("Encriptado Slice array:", cadenaNumerica);
    console.log("Nuevo orden:", nuevoOrden);
    numberxx = nuevoOrden


    queue.enqueue(async () => {
      try {
        const attachment = [];

        if (payload?.body.includes("_event_media_")) {

          const mime_type = payload.mime_type;
          const ext = mimeType.extension(`${mime_type}`);

          const buffer = await downloadMediaMessage(payload, "buffer");

          const fileName = `file-${Date.now()}.${ext}`;
          const pathFile = `${process.cwd()}/public/${fileName}`;
          await fs.writeFile(pathFile, buffer);

          attachment.push(pathFile);


          await handlerMessage({
              type: payload.mime_type,
              phone: nuevoOrden,
              phonecrypt: numeroEncriptado,
              name: payload.pushName,
              message: payload.caption ? payload.caption : "",
              attachment,
              mode: 'incoming'
          }, chatwoot)


        } else if (payload?.body.includes("_event_document_")) {
          function obtenerExtension(nombreArchivo) {
            return nombreArchivo.split(".").pop();
          }

          const mime_type = payload.mime_type;
          const nombre = payload.filename;
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",nombre);
          ext = obtenerExtension(nombre);

          buffer = await downloadMediaMessage(payload, "buffer");

          const fileName = `file-${Date.now()}.${ext}`;
          const pathFile = `${process.cwd()}/public/${fileName}`;
          await fs.writeFile(pathFile, buffer);

          attachment.push(pathFile);

          
          await handlerMessage({
              type: payload.type,
              phone: nuevoOrden,
              phonecrypt: numeroEncriptado,
              name: payload.pushName,
              message: payload.caption ? payload.caption : (payload.filename ? payload.filename : ""),
              attachment,
              mode: 'incoming'
          }, chatwoot)

        } else if (payload?.body.includes("_event_audio_")) {

          const mime_type = payload.mime_type;
          const ext = mimeType.extension(`${mime_type}`);

          buffer = await downloadMediaMessage(payload, "buffer");

          const fileName = `file-${Date.now()}.${ext}`;
          const pathFile = `${process.cwd()}/public/${fileName}`;
          await fs.writeFile(pathFile, buffer);

          attachment.push(pathFile);

          
          await handlerMessage({
              type: payload.mime_type,
              phone: nuevoOrden,
              phonecrypt: numeroEncriptado,
              name: payload.pushName,
              message: payload.caption ? payload.caption : (payload.filename ? payload.filename : ""),
              attachment,
              mode: 'incoming'
          }, chatwoot)
        } else {

          
          // Proceso para manejar otros tipos de eventos
          // Aquí puedes manejar mensajes que no sean media o documentos
          const genericMessage = payload.body; // Mensaje original

          await handlerMessage(
            {
              type: payload.type,
              phone: nuevoOrden,
              phonecrypt: numeroEncriptado,
              name: payload.pushName,
              message: genericMessage, // Mensaje original para otros casos
              attachment,
              mode: "incoming",
            },
            chatwoot
          );
        }
      } catch (err) {
        console.log("ERROR123", err);
      }
    });
  });
    
        /**
         * Los mensajes salientes (cuando el bot le envia un mensaje al cliente ---> )
         */
        bot.on('send_message', (payload) => {
            queue.enqueue(async () => {

              //console.log("payload11111111111111", payload )
              console.log("payload11111111111111", payload );

                await handlerMessage({
                  type: payload.type,
                  phone: nuevoOrden,
                  phonecrypt: numeroEncriptado,
                  name: payload.pushName,
                  message: genericMessage, // Mensaje original para otros casos
                  attachment,
                    mode:'outgoing'
                }, chatwoot)
            })
        })


    }
    
    main()
