const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.User.findOne({
    name: req.body.name
  }).exec((err, user) => {
    if (err) {
        res.status(400).send({
            error: {
                message : "Bad request!"
            }});
      return;
    }
    if (user) {
        res.status(400).send({
            error: {
                message : "Bad request!"
            }});
      return;
    }
    // Email
    User.User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(400).send({
            error: {
                message : "Bad request!"
            }});
        return;
      }
      if (user) {
        res.status(400).send({
            error: {
                message : "Bad request!"
            }});
        return;
      }
      next();
    });
  });
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;