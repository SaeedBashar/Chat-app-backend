
const Users = require('../models/user')
const bcrypt = require("bcrypt");

module.exports.signin = async (req, res, next)=>{
    try {
        
        const { username, password } = req.body;
        const user = await Users.findOne({ username });
        console.log(req.body)
        if (!user)
          return res.json({ msg: "Username Can Not Be Found", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.json({ msg: "Invalid Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
      } catch (ex) {
        next(ex);
    }
}

module.exports.signup = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      
      const usernameCheck = await Users.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username Can Not Be Used", status: false });

      const emailCheck = await Users.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email Can Not Be Used", status: false });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        username,
        email,
        password: hashedPassword,
      });
      
      return res.json({ status: true, user });

    } catch (ex) {
      next(ex);
    }
};