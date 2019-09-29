const Message = require("../../models/messages");

const getnewView = (req, res) => res.render("new", { title: "New Message" });

const postNew = (req, res, next) => {
  const messageData = {
    userId: req.session.userId,
    message: req.body.messageInput,
    user: req.session.userId
  };

  Message.create(messageData)
    .then(() => res.redirect("/profile"))
    .catch(error => next(error));
};

module.exports.getnewView = getnewView;
module.exports.postNew = postNew;