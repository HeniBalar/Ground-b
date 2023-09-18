const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

const User = require("../../models/User");

exports.authFacebook = async(req,res) => {
    try {

        // const {data} = await fetch('https://graph.facebook.com/v4.0/oauth/access_token', {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     params: {
        //       client_id: process.env.FACEBOOK_APP_ID,
        //       client_secret: process.env.FACEBOOK_APP_SECRET,
        //       redirect_uri: process.env.BASE_URL,
        //       code: req.body.code,
        //     },
        // });

        // const ACCESS_TOKEN = data.access_token
        
        // const fetch_user_url =   "https://graph.facebook.com/USER-ID?fields=id,name,email,picture&access_token=ACCESS-TOKEN"
        //if below link doesn't work
        
        const user = await fetch("https://graph.facebook.com/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            params: {
                fields: ['id', 'email', 'name', 'first_name', 'last_name', 'picture'].join(','),
                access_token: ACCESS_TOKEN,
            },
          }); 
    
        const result = await response.json()
        user = await User.findOne({socialid: result.id})

        if(!user){
            const data = {
                socialid: result.id,
                name: result.name,
                email: result.email,
                profile: {
                    pid: null,
                    purl: result.picture.data.url
                },
                usertype: req.params.userType
            }
            const user = new User(data)
            await user.save()

            res.status(201).send({new:"true",user: user})
            
        }

        res.status(201).send({new:"false",user: user})
        
    } catch (error) {
        res.status(201).status({error: error.message});
    }
}

        // {
        //     "id": "USER-ID",
        //     "name": "EXAMPLE NAME",
        //     "email": "EXAMPLE@EMAIL.COM",
        //     "picture": {
        //       "data": {
        //         "height": 50,
        //         "is_silhouette": false,
        //         "url": "URL-FOR-USER-PROFILE-PICTURE",
        //         "width": 50
        //       }
        //     }
        //  }