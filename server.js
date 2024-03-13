const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const connection = require('./mysqlconnection.js')




const swaggerJsdoc = require('swagger-jsdoc');
const { connect } = require('./mysqlconnection');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      description: 'Sample API with Swagger documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['server.js'],
};

// Initialize Swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-client', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// GET endpoint
/**
 * @swagger
 * /api/data:
 *   get:
 *     description: Get some data
 *     responses:
 *       '200':
 *         description: A successful response
 */
app.get('/api/data', (req, res) => {
  res.json({ message: 'GET request received' });
});

// POST endpoint
/**
 * @swagger
 * /api/registration:
 *   post:
 *     description: Post some data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
//
app.post('/api/registration', (req, res) => {
  const data = req.body;
  const registerdata = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    username: data.username
  };
  //inserting into db
  //connection.execute('INSERT INTO register SET ?', registerdata)
  connection.execute('INSERT INTO register (name, email, phone, password, username) VALUES (:name, :email, :phone, :password, :username)', registerdata)

  .then(result => {
    //console.log('Insert successful. Rows affected:', result.affectedRows);
    res.json({ message: 'POST request received', registerdata });
  })
  .catch(err => {
    console.error('Error inserting data:', err);
    res.json({ message: 'something wrong', err });
  });

  //response to the client
  console.log('Received data:', data);
  
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



