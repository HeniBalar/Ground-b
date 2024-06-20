const User = require('../../models/User')
const axios = require('axios')

exports.userDemographice = async (req, res) =>{

    const user = await User.find({ _id: req.body.userid })
    console.log(user)    
    const { latitude, longitude } = req.body
    const { OPENCAGE_API_KEY } = process.env

    if (!latitude || !longitude) {
        return res.status(400).send({ error: 'Latitude and Longitude are required.' });
    }

    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: `${latitude}+${longitude}`,
                key: OPENCAGE_API_KEY
            }
        });

        const data = response.data;

        if (data.results.length > 0) {
            const location = data.results[0].formatted;
            res.status(200).send({ message: "OK", location });
        } else {
            res.status(404).send({ error: 'Location not found!!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching the location.' });
    }
}