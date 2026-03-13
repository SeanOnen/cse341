const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts'
  },
  host: 'https://cse341-contacts-tsfu.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);