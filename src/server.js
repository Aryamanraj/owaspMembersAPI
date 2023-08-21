const express = require("express");
const bodyParser = require("body-parser");
const contractRoutes = require("./routes/contractRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs"); // If your spec is in YAML format

const app = express();
const port = 3000;

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin matches any subdomain of owasprgipt.in
    if (/^https?:\/\/([a-z0-9-]+\.)*owasprgipt\.in$/.test(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use("/api", contractRoutes); // All contract routes will be prefixed with '/api'

const swaggerDocument = YAML.load("src/builds/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;
