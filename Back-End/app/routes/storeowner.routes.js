const controller = require("../controllers/storeowner.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    req.header("Content-Type", "application/json");
    res.header("Content-Type", "application/json");
    next();
  });



  app.post("/api/v1/storeowner/addstore"   ,[authJwt.verifyToken] , controller.addStore);


}