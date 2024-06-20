const USER_ACTIVITY = require('../../models/Useractivity')

exports.getOneuserActivity = async (req, res) => {
    try {
        const { userid } = req.params

        if(!userid) {
            return res.status(400).send({ message: "User ID is required!" })
        }
        const activities = await USER_ACTIVITY.find({ userid }).sort({ date: -1 });

        res.status(200).send({ message: "OK", activities })
    } catch (error) {
        console.error({ error: error.message })
        res.status(500).send({ error: error.message })
    }
}

exports.userActivity = async (req, res) => {
    try{
        const activity = await USER_ACTIVITY.find({})

        const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0]

        const dateMap = activity.reduce((acc, item) => {
            const date = formatDate(item.date)
            if (!acc[date]) {
            acc[date] = { userid: item.userid, date: date, active: 0 }
            }
            acc[date].active += item.active
            return acc
        }, {})

        const U_Active = Object.values(dateMap)

        U_Active.sort((x, y) => new Date(x.date) - new Date(y.date))

        res.status(200).send({ message: "OK", U_Active })
    }catch (error) {
        console.error({ error: error.message })
        res.status(500).send({ error: error.message })
    }
}