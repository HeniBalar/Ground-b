const User = require('../../models/User')

exports.getallUsers = async (req, res) => {
    try {

        const users = await User.find({})
        // console.log('users/...', users)

        return res.status(200).send({ message: "OK", users })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}