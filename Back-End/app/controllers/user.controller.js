
const { User } = require("../models/user.model");
const Product = require("../models/product.model");
exports.addFavorite = (req, res) => {
     User.User.findOne({id:req.userId}).exec(function (err, user) {
            if(err){
                res.status(400).send({
                    error: {
                        message : "Bad request!"
                    }});
                    return;
            }
            if(!user){
                res.status(400).send({
                    error: {
                        message : "User Not Found!"
                    }});
                    return;
            }




     });



};