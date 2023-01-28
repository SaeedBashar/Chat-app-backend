const User = require('../models/user');
const Status = require('../models/status');

module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };

module.exports.getStatus = async (req, res, next)=>{
  try{
    const stats = await Status.find({StatId : req.params.id});
    console.log(stats);
    return res.json(stats);
  }catch (ex){
    console.log(ex.message)
  }
}

module.exports.updateStatus = async (req, res, next)=>{
  try{
    const userStat = await Status.find({StatId : req.body.userId})
    console.log(userStat, "user")
    
    if(userStat.length === 0){
      const query = [{userId : req.body.userId, status : [req.body.status]}]
      const res = await Status.insertMany(query)
      console.log(res, "res");
    }

    if(userStat.length !== 0){
      const stat = await Status.find({userId: req.body.userId});
      console.log(stat, "stat")
      let status = stat.status;
      status = status.concat(req.body.status)
      await Status.where({userId: req.body.id}).update({status: status})
    }

    return res.json({});
  }catch (ex){
    console.log(ex.message)
  }
}