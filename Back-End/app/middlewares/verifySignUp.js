const db = require("../models");
const { NormalUser } = require("../models/normaluser.model");
const { StoreOwner } = require("../models/storeowner.model");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
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
                message : "Email Has Already Exists!"
            }});
        return;
      }
      next();
    });
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;