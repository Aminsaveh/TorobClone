
const controller = require("../controllers/product.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      req.header("Content-Type", "application/json");
      res.header("Content-Type", "application/json");
      next();
    });
    app.post("/api/v1/product/create",[authJwt.verifyToken],controller.createProduct);
    app.get("/api/v1/product/getAll", controller.getAllProducts);
  };