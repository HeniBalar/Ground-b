const User = require("../../models/User");

exports.getUser = async(req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
          return res.send({ message: 'user does not exist' });
        }
        res.send(user);
      } catch (err) {
        res.send({ message: err.message });
      }
}

