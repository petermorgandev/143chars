const Message = require("../../models/messages");

const homepage = async (req, res, next) => {
  if (!req.session.userId) return res.render("index", { title: "Welcome" });

  try {
    const messages = await Message.find().sort({ date: -1 }).populate("user", "-password").exec();
    return res.render("home", { title: "Home", messages });
  } catch (error) {
    return next(error)
  }
}

const logOut = (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
    });
  }
  return res.redirect("/");
}

module.exports.homepage = homepage;
module.exports.logOut = logOut;