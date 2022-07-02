const { Report } = require("../models/report.model")
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


exports.report = (req, res) => {
    Store.findOne({id:req.params.shopId}).exec(function (err, store) {
            if(err){
                res.status(200).send({
                    error: {
                        message : "Bad request!"
                    }});
                    return;
            }
            if(!store){
                res.status(200).send({
                    error: {
                        message : "Store Not Found!"
                    }});
                    return;
            }
            getNextSequence("reportId", function(err, result){
                    if(err){
                        res.status(200).send({
                            error: {
                                message : "Bad request!"
                            }});
                            return;
                    }
                    if(!store.products.includes(req.body.productId.toString())){
                        res.status(200).send({
                            error: {
                                message : "Product Not Found!"
                            }});
                            return;
                    }

                    var report = new Report({
                        id        : result,
                        userId    : req.userId,
                        productId : req.body.productId,
                        kind      : req.body.kind
                    });
                    report.save((err, resu) => {
                            if(err){
                                res.status(200).send({
                                    error: {
                                        message : "Bad request!"
                                    }});
                                    return;
                            }
                            store.reports.push(report.id);
                            store.updateOne({reports :store.reports}, (err, resu) => {
                                    if(err){
                                        res.status(200).send({
                                            error: {
                                                message : "Bad request!"
                                            }});
                                            return;
                                    }else{
                                        res.status(200).send({
                                            message : "successful"
                                          });
                                    }
                            });
                    });
            });
         });
}



exports.getReports = (req, res) => {
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
                        message : "Permission Denied!"
                    }});
                    return;
            }
            Store.findOne({id:req.params.shopId}).exec(function (err, store) {
                    if(err){
                        res.status(200).send({
                            error: {
                                message : "Bad request!"
                            }});
                            return;
                    }
                    if(!store){
                        res.status(200).send({
                            error: {
                                message : "Store Not Found"
                            }});
                            return;
                    }
                    if(store.ownerId !== req.userId){
                        res.status(200).send({
                            error: {
                                message : "Permission Denied!"
                            }});
                            return;
                    }
                    Report.find({id : store.reports},function(err,allReports){
                        if(err){
                            res.status(200).send({
                                error: {
                                    message : "Bad request!"
                                }});
                                return;
                        }
                        res.status(200).send({
                            products: allReports,
                            message : "successful"
                        });
                        return;
                     });
                     if(store.reports.length==0){
                        res.status(200).send({
                            products : [],
                            message : "successful"
                          });
                    }
            });
    });
}