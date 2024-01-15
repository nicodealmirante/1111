const express = require('express')
const cors = require('cors')
const {join} = require('path')
const {createReadStream} = require('fs')

/**
 * Esta clase esta relacionada con todo lo que tiene que ver
 * con un endpoint o rutas de express para tener un punto de entrada
 * externo y flexible
 */

class ServerHttp {
    app;
    port;

    constructor(_port = 3003){
        this.port = _port
    }
 chatwootCtrl = async (req, res) => {
    const crypto = require('crypto');    
    const body = req.body;
        const attachments = body?.attachments
        const bot = req.bot;

        const numberPayload = body.conversation?.meta?.sender?.additional_attributes.company_name
console.log("bodyyyyyyy",req.body)
        

        //const numberPayload = 573504607650;
        
        function generarClaveIV() {
          // Generar una clave y un IV fijos para cada número
          const clave = crypto.createHash('sha256').update('clave_secreta').digest(); 
          const iv = Buffer.alloc(16, 0); // IV fijo
        
          return { clave, iv };
        }
        

        
        function desencriptar(numeroEncriptado, clave, iv) {
         
          const descifrador = crypto.createDecipheriv('aes-256-cbc', clave, iv);
        
       
          let numeroDesencriptado = descifrador.update(numeroEncriptado, 'hex', 'utf-8');
          numeroDesencriptado += descifrador.final('utf-8');
        
          return numeroDesencriptado;
        }
        
       
        const { clave, iv } = generarClaveIV();
        
 
        
      
        const numeroDesencriptado = desencriptar(numberPayload, clave, iv);
        console.log('Número Desencriptado1212:', numeroDesencriptado);
        
    





        try {

            const mapperAttributes = body?.changed_attributes?.map((a) => Object.keys(a)).flat(2)

            /**
             * Esta funcion se encarga de agregar o remover el numero a la blacklist
             * eso quiere decir que podemos hacer que el chatbot responda o no
             * para que nos sirve, para evitar que el chatbot responda mientras
             * un agente humano esta escribiendo desde chatwoot
             */
            if (body?.event === 'conversation_updated' && mapperAttributes.includes('assignee_id')) {
                const phone = body?.meta?.sender?.phone_number.replace('+', '')
                const idAssigned = body?.changed_attributes[0]?.assignee_id?.current_value ?? null
        
                if(idAssigned){
                    bot.dynamicBlacklist.add(numeroDesencriptado)
                }else{
                    bot.dynamicBlacklist.remove(numeroDesencriptado)
                }
                res.send('ok')
                return
            }

            /**
             * La parte que se encarga de determinar si un mensaje es enviado al whatsapp del cliente
             */
            const checkIfMessage = body?.private == false && body?.event == "message_created" && body?.message_type === "outgoing" && body?.conversation?.channel.includes("Channel::Api")
            if (checkIfMessage) {
                const phone = body.conversation?.meta?.sender?.phone_number.replace('+', '')
                const content = body?.content ?? '';

                const file = attachments?.length ? attachments[0] : null;
                if (file) {
                    console.log(`Este es el archivo adjunto...`, file.data_url)
                    await bot.providerClass.sendMedia(
                        `${numeroDesencriptado}`,
                        content,
                        file.data_url,
                       
                    );
                    res.send('ok')
                    return
                }
        


                /**
                 * esto envia un mensaje de texto al ws
                 */
               
                await bot.providerClass.sendMessage(
                    
                    `${numeroDesencriptado}`,
                    content,
                    {}
                );

                res.send('ok');
                return;
               
            }

            res.send('ok')
        } catch (error) {
            console.log(error)
            return res.status(405).send('Error123')
        }
    }


    /**
     * Incia tu server http sera encargador de injectar el instanciamiento del bot
     */
    initialization = (bot = undefined) => {
        if(!bot){
            throw new Error('DEBES_DE_PASAR_BOT')
        }
        this.app = express()
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))

        this.app.use((req, _, next) => {
            req.bot = bot;
            next()
        })

        this.app.post(`/chatwoot`, this.chatwootCtrl)


        this.app.listen(this.port, () => {
            console.log(``)
            console.log(`🦮 online`)
            console.log(``)
        })
    }

}

module.exports = ServerHttp
