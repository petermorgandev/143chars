const Message = require("../../models/messages");

const homepage = (req, res, next) => {
  if (!req.session.userId) {
    return res.render("index", { title: "Welcome" });
  }

  Message.find()
    .sort({ date: -1 })
    .populate("user", "-password")
    .exec()
    .then(messages => res.render("home", { title: "Home", messages }))
    .catch(error => next(error));
}

const logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  }
}

module.exports.homepage = homepage;
module.exports.logout = logout;