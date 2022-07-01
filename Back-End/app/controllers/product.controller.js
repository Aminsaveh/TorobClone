const Product = require("../models/product.model");
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


exports.createProduct = (req, res) => {
    StoreOwner.findOne({id:req.userId}).exec(function (err, user) {
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
                        message : "Permission Denied!"
                    }});
                    return;
            }
            getNextSequence("productId", function(err, result){
                    if(err){
                        res.status(400).send({
                            error: {
                                message : "Bad request!"
                            }});
                            return;
                    }
                    var product = new Product.Product({
                        name     : req.body.name,
                        price    : req.body.price,
                        category : req.body.category,
                        brand    : req.body.brand,
                        imageUrl : req.body.imageUrl,
                        details  : req.body.details,
                        stores   : []
                    })

                    product.save((err, resu) => {
                            if(err){
                                res.status(400).send({
                                    error: {
                                        message : "Permission Denied!"
                                    }});
                                    return;
                            }
                            res.status(200).send({
                                product: product,
                                message : "successful"
                              });

                    });
            });
    });
}


exports.getAllProducts = (req, res) => {
    Product.Product.find({},function(err,allProducts){
        if(err){
            res.status(400).send({
                error: {
                    message : "Bad request!"
                }});
                return;
        }

        res.status(200).send({
            products: allProducts,
            message : "successful"
          });

    });
}