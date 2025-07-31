
const { saveChat, getChats, update, remove, getChat, getFiltersChats } = require('./chat.service')
const {getMessageById} =  require('../message/message.service')


async function creatNewChat(req, res) {
    try {
        const { type,name,creator,participants,managers,messages,description } = req.body
        console.log('a',req.body)
        const newChat = await saveChat({ type,name,creator,participants,managers,messages,description })

        res.status(200).json({ status: '200', data: newChat })

    } catch (err) {
        console.log(err)
        res.status(401).json({ status: '401', data: `${err}` })
    }
}

async function getAllChats(req, res) {
    try {
        const params = req.query
        let query
        if (params.q) {
            const q = params.q
            delete params.q
            query = {
                $and: [{ ...params }, { $or: [{ country: { '$regex': `${q}`, '$options': 'i' } }, { city: { '$regex': `${q}`, '$options': 'i' } }, { id: { '$regex': `${q}`, '$options': 'i' }}]} ]}
        } else {
                query = params
            }



            const chats = await getChats(query)
            res.status(200).json({ status: '200', data: chat })
        } catch (err) { res.status(401).json({ status: '401', data: `${err}` }) }
    }

async function updateChat(req, res) {
        try {
            const { id } = req.params
            const updates = req.body
            const chat = await update(id, updates)
            res.status(200).json({ status: '200', data: chat })
        } catch (err) {
            console.log(err)
            res.status(400).json({ status: '400', data: `${err}` })

        }
    }

    async function deleteChat(req, res) {
        try {
            const { id } = req.params

            const deletedChat = await remove(id)
            res.status(200).json({ status: '200', data: `user deleted ${deletedChat}` })


        } catch (err) {
            res.status(400).json({ status: '400', data: `${err}` })
        }

    }

    async function getChatById(req, res) {
        try {
            const { id } = req.params
            const chat = await getChat(id)
            res.status(200).json({ status: '200', data: chat})

        } catch (err) {
            console.log(err)
            res.status(400).json({ status: '400', data: `${err}` })

        }
    }


    async function getLastMsg(req, res){
        try{
            const { id } = req.params
            const chat = await getChat(id)
            const massageId  = chat.messages[chat.messages.length -1]
            const message = await getMessageById(massageId)
            res.status(200).json({ status: '200', data: message})

        }catch(err){
            res.status(400).json({ status: '400', data: `${err}` })
        }
    }


    module.exports = {
        creatNewChat,
        getAllChats,
        updateChat,
        deleteChat,
        getChatById,
        getLastMsg
        }