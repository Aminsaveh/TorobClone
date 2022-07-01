
const { NormalUser } = require("../models/normaluser.model");
const Product = require("../models/product.model");
exports.addFavorite = (req, res) => {
     NormalUser.findOne({id:req.userId}).exec(function (err, user) {
            if(err){
                res.status(200).send({
                    error: {
                        message : "Bad request!"
                    }});
                    return;
            }
            if(!user){
                res.status(200).send({
                    error: {
                        message : "User Not Found!"
                    }});
                    return;
            }
            Product.Product.findOne({id:req.body.id},function(err,product){
                    if(err){
                        res.status(200).send({
                            error: {
                                message : "Bad request!"
                            }});
                            return;
                    }
                    if(!product){
                        res.status(200).send({
                            error: {
                                message : "Product Not Found!"
                            }});
                            return;
                    }
                    var duplicateP = user.favorites.find(p => p.id === req.body.id);
                    if(!duplicateP){
                        user.favorites.push(product);
                    }
                    user.updateOne({favorites :user.favorites}, (err, result) => {
                            if(err){
                                res.status(200).send({
                                    error: {
                                        message : "Bad request!"
                                    }});
                                    return;
                            }
                            res.status(200).send({
                                message : "successful"
                              });

                    });
            });
     });
};


exports.getFavorites = (req, res) => {
    NormalUser.findOne({id:req.userId}).exec(function (err, user) {
        if(err){
            res.status(200).send({
                error: {
                    message : "Bad request!"
                }});
                return;
        }
        if(!user){
            res.status(200).send({
                error: {
                    message : "User Not Found!"
                }});
                return;
        }

        res.status(200).send({
            favorites : user.favorites,
            message : "successful"
          });
    });

}



exports.deleteFavorite = (req, res) => {
    NormalUser.findOne({id:req.userId}).exec(function (err, user) {
        if(err){
            res.status(200).send({
                error: {
                    message : "Bad request!"
                }});
                return;
        }
        if(!user){
            res.status(200).send({
                error: {
                    message : "User Not Found!"
                }});
                return;
        }
        user.favorites = user.favorites.filter(item => item.id!==req.body.id);
        user.updateOne({favorites :user.favorites}, (err, result) => {
                if(err){
                    res.status(200).send({
                        error: {
                            message : "Bad request!"
                        }});
                        return;
                }
                res.status(200).send({
                    message : "successful"
                  });
        });
 });
}



exports.addLatest = (req, res) => {
    NormalUser.findOne({id:req.userId}).exec(function (err, user) {
        if(err){
            res.status(200).send({
                error: {
                    message : "Bad request!"
                }});
                return;
        }
        if(!user){
            res.status(200).send({
                error: {
                    message : "User Not Found!"
                }});
                return;
        }
        Product.Product.findOne({id:req.body.id},function(err,product){
                if(err){
                    res.status(200).send({
                        error: {
                            message : "Bad request!"
                        }});
                        return;
                }
                if(!product){
                    res.status(200).send({
                        error: {
                            message : "Product Not Found!"
                        }});
                        return;
                }
                user.latest = user.latest.filter(item => item.id!==req.body.id);
                 user.latest.push(product);
                user.updateOne({latest :user.latest}, (err, result) => {
                        if(err){
                            res.status(200).send({
                                error: {
                                    message : "Bad request!"
                                }});
                                return;
                        }
                        res.status(200).send({
                            message : "successful"
                          });

                });
        });
 });
}



exports.getLatest = (req, res) => {
    NormalUser.findOne({id:req.userId}).exec(function (err, user) {
        if(err){
            res.status(200).send({
                error: {
                    message : "Bad request!"
                }});
                return;
        }
        if(!user){
            res.status(200).send({
                error: {
                    message : "User Not Found!"
                }});
                return;
        }

        res.status(200).send({
            latest : user.latest.reverse(),
            message : "successful"
          });
    });

}