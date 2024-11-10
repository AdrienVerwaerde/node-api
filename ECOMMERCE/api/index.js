const express = require('express');
const swaggerJSDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
const port = 4001;

require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

/* Swagger Options */

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'NodeJS B3',
            version: '1.0.0',
            description: 'API du chef',
        },
        servers: [
            {
                url: 'http://localhost:4001/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http', // Type of security
                    scheme: 'bearer', // This is a bearer authentication
                    bearerFormat: 'JWT', // Format of the token
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
        apis: [
            `${__dirname}/routes.js`,
            `${__dirname}/routes/*.js`,
            `${__dirname}/models/*.js`,
            `${__dirname}/controllers/*.js`
        ],
};

const swaggerDocs = swaggerJSDocs(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to the database

mongoose.connect(mongoURI, {})
    .then(() => console.log('Connexion a MongoDB reussie !'))
    .catch((err) => console.log('Connexion a MongoDB echouée : ' + err));

app.get('/', (req, res) => {
    res.send('Hello World !');
})

app.listen(port, () => {
    console.log(`Serveur en ligne port ${port}`);
});