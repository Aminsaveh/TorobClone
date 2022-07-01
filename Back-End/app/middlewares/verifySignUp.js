const db = require("../models");
const { NormalUser } = require("../models/normaluser.model");
const { StoreOwner } = require("../models/storeowner.model");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {

  User.User.findOne({
      phone: req.body.phone
    }).exec((err, user) => {
      if (err) {
        res.status(200).send({
            error: {
                message : "Bad request!"
            }});
        return;
      }
      if (user) {
        res.status(200).send({
            error: {
                message : "Phone Has Already Exists!"
            }});
        return;
      }
      if(req.body.password.length<8 || !/[0-9]/.test(req.body.password) || !/[a-z]/.test(req.body.password) || !/[A-Z]/.test(req.body.password)){
        res.status(200).send({
          error: {
              message : "Password Is Weak!"
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