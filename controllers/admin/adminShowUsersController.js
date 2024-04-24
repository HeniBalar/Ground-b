const Admin = require("../../models/Admin")
const User = require("../../models/User")
const { startOfDay, endOfDay } = require("date-fns")

async function findData(data, req){

    let q = [{usertype: "user"}]

    if(data.date){
        let d = new Date(data.date)
        q.push({createdat: { $gte: startOfDay(d), $lte: endOfDay(d)} })
    }
    if(data.new){
        //const admin = req.admin
        const admin = await Admin.findOne({_id: "62d1359255be03e8de14c1ae"})
        q.push({createdat: { $gte: admin.lasttimeloggedout, $lte: new Date() }})
    }

    return q;
}

exports.adminShowUsers = async(req, res) => {
    try{

        let data = await req.body
        let query = {usertype: "user"}

        if(Object.keys(data).length!==0){
            let temp = await findData(data, req)
            query = {$and : temp}
        }

        const users = await User.find(query).select("first_name last_name mobile noofbooking status createdat profile").sort({"createdat":"asc"});
        res.status(201).send({users})
        console.log("AASS",users.length)

    }catch(error){
        res.send({error: error.message})
    }

}

exports.adminEditUsers = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
          res.send('user does not exist');
          return;
        } else {
        let updatedUser = await User.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $set: {
              first_name : req.body.first_name  || user.first_name,
              last_name : req.body.last_name  || user.last_name,
              mobile: req.body.mobile || user.mobile,
              email: req.body.email || user.email,
              usertype: req.body.usertype || user.usertype,
              status: req.body.status || user.status,
            },
          },
          {
            new: true,
          }
        );
        res.send(updatedUser);
        }
      } catch (error) {
        console.log("An error occurred while processing the request.",error)
        res.send({error: error.message});
      }
}