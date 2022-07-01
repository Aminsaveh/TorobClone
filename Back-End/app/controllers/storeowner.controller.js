const { Store } = require("../models/store.model");
const { StoreOwner } = require("../models/storeowner.model");
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
                console.log("here")
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
                console.log("here1")
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
                        });
                    console.log("here2")
                    user.stores.push(store);
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