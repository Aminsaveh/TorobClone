const { Report } = require("../models/report.model")
const { Store } = require("../models/store.model");
const { StoreOwner } = require("../models/storeowner.model");




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
        var report = new Report.Report({
            userId    : req.userId,
            productId : req.body.productId,
            type      : req.body.type
        });
        store.reports.push(report);
        store.updateOne({reports :store.reports}, (err, result) => {
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
                    res.status(200).send({
                        reports : store.reports,
                        message : "successful"
                      });
            });
    });
}