const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Inventory API',
    description: 'API for managing products and categories'
  },
  host: 'your-render-url.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger_output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);