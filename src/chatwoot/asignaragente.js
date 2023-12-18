const { agentesMap } = require('./agentesmap');

async function asignarAgente(chatwoot, mensaje, conversationId) {
    let apo ; // Valor predeterminado para apo
    for (let clave in agentesMap) {
        if (mensaje.includes(clave)) {
            apo = agentesMap[clave];
            break; // Salir del bucle una vez encontrada la coincidencia
        }
    }

    // Verifica si se ha establecido un valor para 'apo'
    if (apo) {
        try {
            await chatwoot.asignaragente({
                type: apo.toString(),
                msg: mensaje,
                conversation_id: conversationId,
            });
        } catch (error) {
            console.error("Error al asignar agente:", error);
            // Manejar el error adecuadamente
        }
    }
}

module.exports = { asignarAgente };