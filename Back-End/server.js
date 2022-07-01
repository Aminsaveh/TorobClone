const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
// parse requests of content-type - application/json
// simple route
function defaultContentTypeMiddleware (req, res, next) {
  req.headers['content-type'] = 'application/json';
  next();
}
app.use(cors());
app.use(defaultContentTypeMiddleware);
app.use(express.json());

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/report.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



db.mongoose
  .connect(`mongodb+srv://Aminsaveh:Doroodi1380@cluster0.sg1iwur.mongodb.net/?retryWrites=true&w=majority`,)
  .then(() => {
    console.log("Successfully connect to MongoDB.");

  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });