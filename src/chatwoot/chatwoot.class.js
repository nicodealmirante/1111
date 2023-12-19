const { readFile } = require('fs/promises');

class ChatwootClass {

    config = {
        account: undefined,
        token: undefined,
        endpoint: undefined
    }

    /**
     * Recibir todos los parametro de configuracio de conexion con chatwoot
     */
    constructor(_config = {}) {

        if (!_config?.account) {
            throw new Error('ACCOUNT_ERROR')
        }

        if (!_config?.token) {
            throw new Error(`TOKEN_ERROR`)
        }

        if (!_config?.endpoint) {
            throw new Error(`ENDPOINT_ERROR`)
        }

        this.config = _config

    }

    /**
     * [utility]
     * Formateo del formato del numero +34 34
     * @param {*} number 
     * @returns 
     */
    formatNumber = (number) => {
        if (!number.startsWith("+")) {
            return `+${number}`
        }
        return number
    }

    /**
     * [utility]
     * Esta funciona nos ayuda a crear un encabezado con la authorization del token
     * @returns 
     */
    buildHeader = () => {
        const headers = new Headers()
        headers.append('api_access_token', this.config.token)
        headers.append('Content-Type', 'application/json')
        return headers
    }

    /**
     * [utility]
     * Esto nos ayuda a construir un url base 
     * @param {*} path 
     * @returns 
     */
    buildBaseUrl = (path) => {
        return `${this.config.endpoint}/api/v1/accounts/${this.config.account}${path}`
    }

    /**
     * [CONTACT]
     * https://www.chatwoot.com/developers/api/#tag/Contacts/operation/contactSearch
     * https://chatwoot-production-e265.up.railway.app/api/v1/accounts/1/contacts/search?q=+359987499
     * @param {*} from numero de telefono 
     * @returns [] array
     */
    findContact = async (from) => {
        try {
            const url = this.buildBaseUrl(`/contacts/search?q=${from}`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET'
            })

            const data = await dataFetch.json()
            return data.payload[0]

        } catch (error) {
            console.error(`[Error searchByNumber]`, error)
            return []
        }
    }

    /**
     * [CONTACT]
     *  Crear un contacto
     * @param {*} dataIn 
     * @returns 
     */
    createContact = async (dataIn = { from: '', name: '', inbox: '' }) => {
        try {

            dataIn.from = this.formatNumber(dataIn.from)

            const data = {
                inbox_id: dataIn.inbox,
                name: dataIn.name,
                phone_number: dataIn.from,
            };

            const url = this.buildBaseUrl(`/contacts`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'POST',
                body: JSON.stringify(data)
            })

            const response = await dataFetch.json()
            return response.payload.contact

        } catch (error) {
            console.error(`[Error createContact]`, error)
            return
        }
    }

    /** 
     * [CONTACT]
     * Buscar o crear contacto
     * @param {*} dataIn 
     * @returns 
     */
    findOrCreateContact = async (dataIn = { from: '', name: '', inbox: '' }) => {
        try {
            dataIn.from = this.formatNumber(dataIn.from)
            const getContact = await this.findContact(dataIn.from)
            if (!getContact) {
                const contact = await this.createContact(dataIn)
                return contact
            }
            return getContact

        } catch (error) {
            console.error(`[Error findOrCreateContact]`, error)
            return
        }
    }


    /**
     * [CONVERSATION]
     * Importante crear este atributo personalizado en el chatwoot
     * Crear conversacion
     * @param {*} dataIn 
     * @returns 
     */
    createConversation = async (dataIn = { inbox_id: '', contact_id: '', phone_number: '' }) => {
        try {

            dataIn.phone_number = this.formatNumber(dataIn.phone_number)

            const payload = {
                custom_attributes: { phone_number: dataIn.phone_number },
            };

            const url = this.buildBaseUrl(`/conversations`)
            const dataFetch = await fetch(url,
                {
                    method: "POST",
                    headers: this.buildHeader(),
                    body: JSON.stringify({ ...dataIn, ...payload }),
                }
            );
            const data = await dataFetch.json();
            return data
        } catch (error) {
            console.error(`[Error createConversation]`, error)
            return
        }
    }

    /**
     * [CONVERSATION]
     * Buscar si existe una conversacion previa
     * @param {*} dataIn 
     * @returns 
     */
    findConversation = async (dataIn = { phone_number: '' }) => {
        try {
            dataIn.phone_number = this.formatNumber(dataIn.phone_number)

            const payload = [
                {
                    attribute_key: "phone_number",
                    attribute_model: "standard",
                    filter_operator: "equal_to",
                    values: [dataIn.phone_number],
                    custom_attribute_type: "",
                },
            ];

            const url = this.buildBaseUrl(`/conversations/filter`)

            const dataFetch = await fetch(url,
                {
                    method: "POST",
                    headers: this.buildHeader(),
                    body: JSON.stringify({ payload }),
                }
            );


            const data = await dataFetch.json();
            return data.payload
        } catch (error) {
            console.error(`[Error findConversation]`, error)
            return
        }
    }

    /**
     * [CONVERSATION]
     * Buscar o Crear conversacion
     * @param {*} dataIn 
     * @returns 
     */
    findOrCreateConversation = async (dataIn = { inbox_id: '', contact_id: '', phone_number: '' }) => {
        try {
            dataIn.phone_number = this.formatNumber(dataIn.phone_number)
            const getId = await this.findConversation(dataIn)
            if (!getId.length) {
                console.log('Crear conversation')
                const conversationId = await this.createConversation(dataIn)
                return conversationId
            }
            return getId[0]
        } catch (error) {
            console.error(`[Error findOrCreateInbox]`, error)
            return
        }
    }

    /**
     * Esta funcion ha sido modificada para poder enviar archivos multimedia y texto
     * [messages]
     * @param {mode}  "incoming" | "outgoing"
     * @param {*} dataIn 
     * @returns 
     */
    createMessage = async (dataIn = {type: '', msg: '', mode: '', conversation_id: '', attachment: [] }) => {
        try {
            const url = this.buildBaseUrl(`/conversations/${dataIn.conversation_id}/messages`)
            const form = new FormData();
          
            form.set("content", dataIn.msg);
            form.set("message_type", dataIn.mode);
            form.set("private", "true");
    
            if(dataIn.attachment?.length){

                const mimeType = dataIn.type;
                const fileContent = await readFile(dataIn.attachment[0]);
                const fileName  = `${dataIn.attachment[0]}`.split('/').pop()
                const blob = new Blob([fileContent], { type: mimeType });

                console.log("Blob with MIME type:", blob);
                form.set("attachments[]", blob, fileName);
                //form.set("attachments[]", blob, fileName);
            }
    
            
            const dataFetch = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        api_access_token:this.config.token
                    },
                    body: form
                }
            );
            const data = await dataFetch.json();
            return data
        } catch (error) {
            console.error(`[Error createMessage]`, error)
            return
        }
    }


    asignaragente = async (dataIn = {type: '', msg: '',conversation_id:"" }) => {
        try {
            const url = this.buildBaseUrl(`/conversations/${dataIn.conversation_id}/assignments`)
            const form = new FormData();
          

            form.set("assignee_id", dataIn.type);
            

    

    
            
            const dataFetch = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        api_access_token:this.config.token
                    },
                    body: form
                }
            );
            const data = await dataFetch.json();
            console.error(`[enviosatis]`, data)
            return data
        } catch (error) {
            console.error(`[Error asignando usuario]`, error)
            return
        }
    }
    

    /**
     * [inboxes]
     * Crear un inbox si no existe
     * @param {*} dataIn 
     * @returns 
     */
    createInbox = async (dataIn = { name: '' }) => {
        try {
            const payload = {
                name: dataIn.name,
                channel: {
                    type: "api",
                    webhook_url: "",
                },
            };

            const url = this.buildBaseUrl(`/inboxes`)
            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'POST',
                body: JSON.stringify(payload)
            })

            const data = await dataFetch.json();
            return data;

        } catch (error) {
            console.error(`[Error createInbox]`, error)
            return
        }
    }

    /**
     * [inboxes]
     * Buscar si existe un inbox creado
     * @param {*} dataIn 
     * @returns 
     */
    findInbox = async (dataIn = { name: '' }) => {
        try {

            const url = this.buildBaseUrl(`/inboxes`)
            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET',
            })

            const data = await dataFetch.json();
            const payload = data.payload

            const checkIfExist = payload.find((o) => o.name === dataIn.name)

            if (!checkIfExist) {
                return
            }

            return checkIfExist;
        } catch (error) {
            console.error(`[Error findInbox]`, error)
            return
        }
    }

    /**
     * [inboxes]
     * Buscar o crear inbox
     * @param {*} dataIn 
     * @returns 
     */
    findOrCreateInbox = async (dataIn = { name: '' }) => {
        try {
            const getInbox = await this.findInbox(dataIn)
            if (!getInbox) {
                const idInbox = await this.createInbox(dataIn)
                return idInbox
            }
            return getInbox

        } catch (error) {
            console.error(`[Error findOrCreateInbox]`, error)
            return
        }
    }

}


module.exports = ChatwootClass