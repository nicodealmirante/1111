const { agentesMap } = require('./agentesmap');
const { asignarAgente } = require('./asignaragente');

const handlerMessage = async (dataIn = { type: "", phone:'' , name: '', message: '', mode: '', attachment: [] }, chatwoot) => {
    try {
        // Configuración inicial de Chatwoot
        const inbox = await chatwoot.findOrCreateInbox({ name: 'BOTWS' });
        const contact = await chatwoot.findOrCreateContact({ from: dataIn.name, name: dataIn.name });
        const conversation = await chatwoot.findOrCreateConversation({
            inbox_id: inbox.id,
            contact_id: contact.id,
            phone_number: dataIn.phone
        });

        // Crear mensaje en Chatwoot
        await chatwoot.createMessage({
            type: dataIn.type,
            msg: dataIn.message,
            mode: dataIn.mode,
            conversation_id: conversation.id,
            attachment: dataIn.attachment
        });

        // Verificar y asignar agente
        if (Object.keys(agentesMap).some(clave => dataIn.message.includes(clave))) {
            await asignarAgente(chatwoot, dataIn.message, conversation.id);
        }
    } catch (error) {
        console.error("Error en handlerMessage:", error);
        // Implementar lógica de manejo de errores según sea necesario
    }
}

module.exports = { handlerMessage };
