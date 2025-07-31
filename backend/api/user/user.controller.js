const { getUsers, getUser, update, deleteU } = require('./user.service')


async function getAllUsers(req, res) {
    try {
        const users = await getUsers()
        res.status(200).json({ status: '200', data: `${users}` })
    } catch (err) {
        res.status(400).json({ status: '400', data: `${err}` })
    }

}

async function getUserById(req, res) {
    try {
        const { id } = req.params
        const user = await getUser(id)
        res.status(200).json({ status: '200', user })

    } catch (err) {
        console.log(err)
        res.status(400).json({ status: '400', data: err })

    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params
        const updates = req.body

        const user = await update(id, updates)
        res.status(200).json({ status: '200', user})
    } catch (err) {
        console.log(err)
        res.status(400).json({ status: '400', data: `${err}` })

    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const { loggedInUser } = req.body
        if (loggedInUser === id) {
            const deletedUser = await deleteU(id)
            res.status(200).json({ status: '200', data: `user deleted ${deletedUser}` })

        } else {
            throw 'id not correct'
        }

    } catch (err) {
        res.status(400).json({ status: '400', data: `${err}` })
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}