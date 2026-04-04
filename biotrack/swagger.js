const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'BioTrack API',
    description: 'Biosystems Engineering Research Management API. POST, PUT and DELETE routes require authentication via GitHub OAuth at /auth/github'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger_output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);