const Messages = require("../models/messages");

module.exports.messageSend = async (req, res, next) => {

  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ status: true, msg: "Message added successfully." });
    else return res.json({ status: false,  msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          createdAt: msg.createdAt
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };