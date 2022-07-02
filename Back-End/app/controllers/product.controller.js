const Product = require("../models/product.model");
const { StoreOwner } = require("../models/storeowner.model");
const { Store } = require("../models/store.model");
const { ProductStore } = require("../models/productstore.model");
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
            getNextSequence("productId", function(err, result){
                    if(err){
                        res.status(200).send({
                            error: {
                                message : "Bad request!"
                            }});
                            return;
                    }
                    var product = new Product.Product({
                        id       : result,
                        name     : req.body.name,
                        price    : 0,
                        category : req.body.category,
                        brand    : req.body.brand,
                        imageUrl : req.body.imageUrl,
                        details  : req.body.details,
                        stores   : []
                    })

                    product.save((err, resu) => {
                            if(err){
                                res.status(200).send({
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

exports.addStore = (req, res) => {
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
        Product.Product.findOne({id : req.body.productId},function(err,product){
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
                            message : "No Product Found!"
                        }});
                        return;
                }
            if(!user.stores.includes(req.body.storeId.toString())){
                res.status(200).send({
                    error: {
                        message : "No Shop Found!"
                    }});
                    return;
            }
            var productStore = new ProductStore({
                    price   : req.body.price,
                    storeId : req.body.storeId
            })
            product.price = req.body.price;
            if(!product.stores)
                product.stores = [];
            product.stores.push(productStore);
            product.updateOne({price :product.price , stores : product.stores }, (err, result) => {
                    if(err){
                        res.status(200).send({
                            error: {
                                message : "Bad request!"
                            }});
                            return;
                    }
                    Store.findOne({id : req.body.storeId },function(err,st){
                        if(err){
                            res.status(200).send({
                                error: {
                                    message : "Bad request!"
                                }});
                                return;
                        }
                        console.log(st)
                        st.products.push(req.body.productId);
                        st.updateOne({products :st.products}, (err, result) => {
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
    });
}




exports.getAllProducts = (req, res) => {
    Product.Product.find({},function(err,allProducts){
        if(err){
            res.status(200).send({
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


exports.getProductsByName = (req,res)=>{
    var keywords = req.body.name.split(' ');
    Product.Product.find({},function(err,allProducts){
        if(err){
            res.status(200).send({
                error: {
                    message : "Bad request!"
                }});
                return;
        }
        var chosenProducts = [];
        keywords.some(element => {
            allProducts.map(p => {
                    if(p.name.toLowerCase().includes(element.toLowerCase())){
                        chosenProducts.push(p);
                    }
                });
            });
        res.status(200).send({
            products: chosenProducts,
            message : "successful"
          });

    });
}


exports.getProductsByCategory = (req,res)=>{
    Product.Product.find({category : req.body.category},function(err,allProducts){
            if(err){
                res.status(200).send({
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


exports.getProductsByBrand = (req,res)=>{
    Product.Product.find({brand : req.body.brand},function(err,allProducts){
            if(err){
                res.status(200).send({
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