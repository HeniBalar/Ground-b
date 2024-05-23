const Ground = require("../../models/Ground")

exports.getSuperTrufs = async (req, res) => {
    try {
        const grounds = await Ground.find({}); // console.log('grounds....', grounds)
        let superTruf = []
        grounds.forEach((ground) => {
            if(ground.rating > 4.5) superTruf.push(ground)
        })
        // console.log('superTruf....', superTruf)
        res.status(200).send({ superTruf, message: "Top pics grounds." })
    } catch (error) {
        consoel.error({ error: error.message })
        res.status(500).send({ error: error.message })
    }
}