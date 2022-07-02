const controller = require("../controllers/report.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      req.header("Content-Type", "application/json");
      res.header("Content-Type", "application/json");
      next();
    });

    app.post("/api/v1/report/:shopId"           ,[authJwt.verifyToken], controller.report);
    app.get( "/api/v1/report/:shopId"           ,[authJwt.verifyToken], controller.getReports)
};