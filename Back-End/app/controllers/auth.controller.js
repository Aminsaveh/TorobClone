const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { NormalUser } = require("../models/normaluser.model");
const { StoreOwner } = require("../models/storeowner.model");
const { Sms } = require("../models/smscodes.model");
var messagebird = require('messagebird')('nIrHEeySrImyLDh0eLFSEktBE');
const Counters = db.counters;

function getNextSequence(name, callback) {
  Counters.Counters.findOneAndUpdate({ id: name },  { $inc: { seq: 1 } }, function(err, result){
          if(err) callback(err, result);
          if(result){
            callback(err, result.seq);
          }else{
            var counter = new Counters.Counters({
                id: name,
                seq : 2,
            });
            counter.save(err,res => {
              if(err) callback(err, result);
              callback(err, 1);
            });
          }
       
  });
}
exports.signup = (req, res) => {
  getNextSequence("userId", function(err, result){
      if(!err){
          var user = new User.User(); 
          if(req.body.userType == "normal"){
           user = new NormalUser({
              id        : result,
              name      : req.body.name,
              email     : req.body.email,
              phone     : req.body.phone,
              password  : bcrypt.hashSync(req.body.password, 8),
              favorites : [],
              latest    : []
            })
          }
          else if(req.body.userType == "storeOwner"){
              user = new StoreOwner({
              id        : result,
              name      : req.body.name,
              email     : req.body.email,
              phone     : req.body.phone,
              password  : bcrypt.hashSync(req.body.password, 8),
              stores    : []
            })
          }


        user.save((err, resu) => {
          if (err) {
              res.status(400).send({
                  error: {
                      message : "Bad request!"
                  }});
            return;
          }
          var user = new User.User({
            id        : result,
            name      : req.body.name,
            email     : req.body.email,
            phone     : req.body.phone,
            password  : bcrypt.hashSync(req.body.password, 8),
          })
          user.save((err,resu) => {
            if(err){
              res.status(400).send({
                error: {
                    message : "Bad request!"
                }});
              return;
            }
            var jwtToken = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // 24 hours
          });
          res.status(200).send({
              token: jwtToken,
              message : "successful"
            });

          });
        });
      }else{
        res.status(400).send({
          error: {
              message : "Bad request!"
          }});
      return;
      }
});
};
exports.signin = (req, res) => {
  User.User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(400).send({
            error: {
                message : "Bad request!"
            }});
        return;
      }
      if (!user) {
        return    res.status(400).send({
            error: {
                message : "Bad request!"
            }});
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return  res.status(400).send({
            error: {
                message : "Bad request!"
            }});
      }
      var jwtToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        token: jwtToken,
        message : "successful"
      });
    });
};

exports.sendSmsVerification = (req, res) => {
  console.log(req.body.phone);
  var number = "+98"+req.body.phone;
  console.log(number)
  messagebird.verify.create(number, {
    originator : 'TorobClone',
    timeout    : 600,
    template : 'Your verification code is %token.'}, function (err, response) {
    if (err) {
        console.log(err);
        res.status(400).send({
            error: {
                message : "Bad request!"
            }});
      return;
    } else {
      sms = new Sms({
        userEmail : req.body.email,
        id        : response.id
      })
      sms.save((err, resu) => {
          if(err){
            res.status(400).send({
              error: {
                  message : "Bad request!"
              }});
            return;
          }
        res.status(200).send({
          id: response.id,
          message : "successful"
        });
      });
    }
});
};


exports.verifySmsCode = (req, res) => {
  var id = req.body.id;
  var token = req.body.token;
  messagebird.verify.verify(id, token, function(err, response) {
    if (err) {
      console.log(err);
      res.status(400).send({
        error: {
            message : "Bad request!"
        }});
      return;
    } else {
      res.status(200).send({
        message : "successful"
      });
    }
  });
}
