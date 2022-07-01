const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
  });
  app.post(
    "/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );
  app.post("/api/v1/auth/login"  , controller.signin);
  app.post("/api/v1/auth/sendSms", controller.sendSmsVerification);
  app.post("/api/v1/auth/verify" , controller.verifySmsCode);
};