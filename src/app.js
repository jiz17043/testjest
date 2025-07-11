const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiRouter = require('./route/v1/api');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    tags: [
      { name: 'User', description: 'User management endpoints' },
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Public', description: 'Public API Endpoints' },
      { name: 'Greeting', description: 'Greeting related endpoints' }
    ]
  },
  apis: [__filename], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a greeting
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * /greet:
 *   post:
 *     summary: Greet a user
 *     tags: [Greeting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *     responses:
 *       200:
 *         description: Greeted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, Alice!
 *       400:
 *         description: Missing name in request
 *       500:
 *         description: Internal server error
 */
app.post('/greet', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    res.status(200).json({ message: `Hello, ${name}!` });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/private', (req, res) => {
  res.send('This is a private endpoint and will not appear in Swagger docs.');
});

app.use('/route/v1', apiRouter);

module.exports = app;