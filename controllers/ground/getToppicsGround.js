const Ground = require("../../models/Ground")

exports.getToppicsGround = async (req, res) => {
    try {
        const grounds = await Ground.find({}); // console.log('grounds....', grounds)
        let topGrounds = []
        grounds.forEach((ground) => {
            if(ground.rating > 4) topGrounds.push(ground)
        })
        // console.log('topgrounds....', topGrounds)
        res.status(200).send({ topGrounds, message: "Top pics grounds." })
    } catch (error) {
        consoel.error({ error: error.message })
        res.status(500).send({ error: error.message })
    }
}