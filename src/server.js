const express = require('express');
const bodyParser = require('body-parser');
const contractRoutes = require('./routes/contractRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // If your spec is in YAML format

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', contractRoutes);  // All contract routes will be prefixed with '/api'

const swaggerDocument = YAML.load('src/builds/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;

