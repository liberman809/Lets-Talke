const { saveMessage, getMessageById, getMessages, update, remove } = require('./message.service')


async function creatNewMessage(req, res) {
    try {

        const { from,to,text } = req.body
        const newMessage = await saveMessage({ from,to,text })

        
        res.status(200).json({ status: '200', data: newMessage })

    } catch (err) {
        res.status(401).json({ status: '401', data: `${err}` })
    }
}

async function getAllMessages(req, res) {
    try {
        const reviews = await getMessages()
        res.status(200).json({ status: '200', data: `reviews ${reviews}` })
    } catch (err) { res.status(401).json({ status: '401', data: `${err}` }) }
}

async function getMessage(req, res) {
    try {
        const { id } = req.params
        const message = await getMessageById(id)
        res.status(200).json({ status: '200', data: message })
    } catch (err) { res.status(401).json({ status: '401', data: `${err}` }) }
}


async function updateMessage(req, res) {
    try {
        const { id } = req.params
        const updates = req.body
        const review = await update(id, updates)
        res.status(200).json({ status: '200', data: `${review}` })
    } catch (err) {
        res.status(400).json({ status: '400', data: `${err}` })

    }
}

async function deleteMessage(req, res) {
    try {
        const { id } = req.params

        const deletedReview = await remove(id)
        res.status(200).json({ status: '200', data: `user deleted ${deletedReview}` })


    } catch (err) {
        res.status(400).json({ status: '400', data: `${err}` })
    }

}

module.exports = {
    creatNewMessage,
    getAllMessages,
    getMessage,
    updateMessage,
    deleteMessage,
}