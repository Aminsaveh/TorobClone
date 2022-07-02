
const { NormalUser } = require("../models/normaluser.model");
const Product = require("../models/product.model");
const { User } = require("../models/user.model");

exports.getAllUsers = (req, res) => {
    User.find({}).exec(function (err, allUsers) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        res.status(200).send({
            users: allUsers,
            message: "successful"
        });

    });
}


exports.getUser = (req, res) => {
    User.find({ id: req.userId }).exec(function (err, user) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        res.status(200).send({
            user: user,
            message: "successful"
        });

    });
}



exports.addFavorite = (req, res) => {
    NormalUser.findOne({ id: req.userId }).exec(function (err, user) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        if (!user) {
            res.status(200).send({
                error: {
                    message: "User Not Found!"
                }
            });
            return;
        }
        Product.Product.findOne({ id: req.body.id }, function (err, product) {
            if (err) {
                res.status(200).send({
                    error: {
                        message: "Bad request!"
                    }
                });
                return;
            }
            if (!product) {
                res.status(200).send({
                    error: {
                        message: "Product Not Found!"
                    }
                });
                return;
            }
            var duplicateP = user.favorites.find(p => p.id === req.body.id);
            if (!duplicateP) {
                user.favorites.push(product.id);
            }
            user.updateOne({ favorites: user.favorites }, (err, result) => {
                if (err) {
                    res.status(200).send({
                        error: {
                            message: "Bad request!"
                        }
                    });
                    return;
                }
                res.status(200).send({
                    message: "successful"
                });

            });
        });
    });
};


exports.getFavorites = (req, res) => {
    NormalUser.findOne({ id: req.userId }).exec(function (err, user) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        if (!user) {
            res.status(200).send({
                error: {
                    message: "User Not Found!"
                }
            });
            return;
        }
        Product.Product.find({ id: user.favorites }).exec(function (err, ps) {
            res.status(200).send({
                favorites: ps,
                message: "successful"
            });
            return;
        });
        if (user.favorites.length == 0) {
            res.status(200).send({
                favorites: [],
                message: "successful"
            });
        }

    });

}



exports.deleteFavorite = (req, res) => {
    NormalUser.findOne({ id: req.userId }).exec(function (err, user) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        if (!user) {
            res.status(200).send({
                error: {
                    message: "User Not Found!"
                }
            });
            return;
        }
        console.log(user.favorites);
        console.log(req.body.id);
        user.favorites = user.favorites.filter(item => item !== req.body.id.toString());
        user.updateOne({ favorites: user.favorites }, (err, result) => {
            if (err) {
                res.status(200).send({
                    error: {
                        message: "Bad request!"
                    }
                });
                return;
            }
            res.status(200).send({
                message: "successful"
            });
        });
    });
}



exports.addLatest = (req, res) => {
    NormalUser.findOne({ id: req.userId }).exec(function (err, user) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        if (!user) {
            res.status(200).send({
                error: {
                    message: "User Not Found!"
                }
            });
            return;
        }
        Product.Product.findOne({ id: req.body.id }, function (err, product) {
            if (err) {
                res.status(200).send({
                    error: {
                        message: "Bad request!"
                    }
                });
                return;
            }
            if (!product) {
                res.status(200).send({
                    error: {
                        message: "Product Not Found!"
                    }
                });
                return;
            }
            user.latest = user.latest.filter(item => item !== req.body.id.toString());
            user.latest.push(product.id);
            user.updateOne({ latest: user.latest }, (err, result) => {
                if (err) {
                    res.status(200).send({
                        error: {
                            message: "Bad request!"
                        }
                    });
                    return;
                }
                res.status(200).send({
                    message: "successful"
                });

            });
        });
    });
}



exports.getLatest = (req, res) => {
    NormalUser.findOne({ id: req.userId }).exec(function (err, user) {
        if (err) {
            res.status(200).send({
                error: {
                    message: "Bad request!"
                }
            });
            return;
        }
        if (!user) {
            res.status(200).send({
                error: {
                    message: "User Not Found!"
                }
            });
            return;
        }

        if (user.latest.length === 0) {
            res.status(200).send({
                latest: [],
                message: "successful"
            });
            return;
        }
        Product.Product.find({ id: user.latest }).exec(function (err, ps) {
            res.status(200).send({
                latest: ps.reverse(),
                message: "successful"
            });
            return;
        });


    });

}