const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

class ServerHttp {
    app;
    port;

    constructor(_port = 3003) {
        this.port = _port;
    }

    encryptPhone = (phone) => {
        const encryptionKey = 'claveDeCifradoSuperSecreta'; // Clave de cifrado (maneja esto de manera segura)
        const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
        let encryptedPhone = cipher.update(phone, 'utf8', 'hex');
        encryptedPhone += cipher.final('hex');
        return encryptedPhone;
    }

    decryptPhone = (encryptedPhone) => {
        const decryptionKey = 'claveDeCifradoSuperSecreta'; // Clave de cifrado (igual que la usada para encriptar)
        const decipher = crypto.createDecipher('aes-256-cbc', decryptionKey);
        let decryptedPhone = decipher.update(encryptedPhone, 'hex', 'utf8');
        decryptedPhone += decipher.final('utf8');
        return decryptedPhone;
    }

    chatwootCtrl = async (req, res) => {
        const body = req.body;
        const attachments = body?.attachments;
        const bot = req.bot;

        try {
            if (body?.event === 'conversation_updated') {
                const phone = this.encryptPhone(body?.meta?.sender?.phone_number.replace('+', ''));
                const idAssigned = body?.changed_attributes[0]?.assignee_id?.current_value ?? null;

                const encryptedPhone = this.encryptPhone(phone);

                if (idAssigned) {
                    bot.dynamicBlacklist.add(encryptedPhone);
                } else {
                    bot.dynamicBlacklist.remove(encryptedPhone);
                }
                res.send('ok');
                return;

            }





            if (body?.private == false && body?.event == "message_created" && body?.message_type === "outgoing") {
                const phone = this.encryptPhone(body.conversation?.meta?.sender?.phone_number.replace('+', ''));
                const content = body?.content ?? '';

                const decryptedPhone = this.encryptPhone(phone);

                // Resto de tu lógica para enviar el mensaje utilizando el número desencriptado
                await bot.provider.sendtext(`${decryptedPhone}@c.us`, content);

                res.send('ok');
                return;
            }

            res.send('ok');
        } catch (error) {
            console.log(error);
            return res.status(405).send('Error');
        }
    }

    initialization = (bot = undefined) => {
        if (!bot) {
            throw new Error('DEBES_DE_PASAR_BOT');
        }
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use((req, _, next) => {
            req.bot = bot;
            next();
        });

        this.app.post(`/chatwoot`, this.chatwootCtrl);

        this.app.listen(3005, () => {
            console.log(`🦮 http://localhost:${this.port}/scan-qr`);
        });
    }
}

module.exports = ServerHttp;