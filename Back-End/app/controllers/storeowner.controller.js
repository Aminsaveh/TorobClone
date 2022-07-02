const { Store } = require("../models/store.model");
const { StoreOwner } = require("../models/storeowner.model");
const { User } = require("../models/user.model");
const db = require("../models");
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



exports.addStore = (req,res)=>{
    StoreOwner.findOne({id:req.userId}).exec(function (err, user) {
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
                getNextSequence("storeId", function(err, result){
                        if(err){
                            res.status(200).send({
                                error: {
                                    message : "Bad request!"
                                }});
                                return;
                        }
                        var store = new Store({
                            id      : result,
                            name    : req.body.name,
                            city    : req.body.city,
                            ownerId : req.userId,
                            reports : [],
                            products: []
                        });
                    user.stores.push(store.id);
                    store.save((err, resu) => {
                            if(err){
                                console.log(err);
                                res.status(200).send({
                                    error: {
                                        message : "Bad request!"
                                    }});
                                    return; 
                            }
                            user.updateOne({stores : user.stores}, (err, result) => {
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
    });

};


exports.getStores = (req,res)=>{
    Store.find({ownerId : req.userId}).exec(function (err, stores) {
            if(err){
                res.status(200).send({
                    error: {
                        message : "Bad request!"
                    }});
                    return;
            }
            res.status(200).send({
                stores  : stores,
                message : "successful"
              });
    });
}


exports.updateProfile = (req,res)=>{
    StoreOwner.findOne({id:req.userId}).exec(function (err, user) {
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
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.updateOne({name : user.name, phone : user.phone}, (err, result) => {
                if(err){
                    res.status(200).send({
                        error: {
                            message : "Bad request!"
                        }});
                        return;
                }
                User.findOne({id:req.userId}).exec(function (err, use) {
                        if(err){
                            res.status(200).send({
                                error: {
                                    message : "Bad request!"
                                }});
                                return;
                        }
                        use.name = req.body.name;
                        use.phone = req.body.phone;
                        use.updateOne({name : use.name, phone : use.phone}, (err, result) => {
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
    });
}