const Admin = require("../../models/Admin")
const User = require("../../models/User")
const { startOfDay, endOfDay } = require("date-fns")

async function findData(data, req){

    let q = [{usertype: "owner"}]

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

exports.adminShowOwners = async(req, res) => {
    try{

        let data = req.body
        let query = {usertype: "owner"}

        if(Object.keys(data).length!==0){
            let temp = await findData(data, req)
            query = {$and : temp}
        }

        const owners = await User.find(query).select("first_name last_name mobile noofownedgrounds status createdat profile").sort({"createdat":"asc"});
        res.status(201).send({owners})
        console.log("AASS",owners.length)

    }catch(error){
        res.send({error: error.message})
    }

}

exports.adminEditOwners = async(req, res) => {
    try {
        const ownerId = req.params.id;
        const owner = await User.findById(ownerId);
        if (!owner) {
          res.send('owner does not exist');
          return;
        } else {
        let updatedUser = await User.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $set: {
              first_name : req.body.first_name  || owner.first_name,
              last_name : req.body.last_name  || owner.last_name,
              mobile: req.body.mobile || owner.mobile,
              email: req.body.email || owner.email,
              usertype: req.body.usertype || owner.usertype,
              status: req.body.status || owner.status,
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