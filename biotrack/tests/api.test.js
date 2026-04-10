const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');

const Experiment = require('../models/Experiment');
const Sample = require('../models/Sample');
const Equipment = require('../models/Equipment');
const Researcher = require('../models/Researcher');

const experimentsRouter = require('../routes/experiments');
const samplesRouter = require('../routes/samples');
const equipmentRouter = require('../routes/equipment');
const researchersRouter = require('../routes/researchers');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    req.isAuthenticated = () => true;
    next();
  });

  app.use('/experiments', experimentsRouter);
  app.use('/samples', samplesRouter);
  app.use('/equipment', equipmentRouter);
  app.use('/researchers', researchersRouter);

  await Experiment.create({
    title: 'Test Experiment',
    description: 'Test description',
    startDate: '2026-04-01',
    status: 'planned',
    researcherId: 'R001'
  });

  await Sample.create({
    name: 'Test Sample',
    type: 'Soil',
    source: 'Test Field',
    collectionDate: '2026-04-01',
    storageLocation: 'Freezer A',
    quantity: 100,
    unit: 'grams'
  });

  await Equipment.create({
    name: 'Test Centrifuge',
    type: 'Centrifuge',
    serialNumber: 'TEST-001',
    location: 'Lab 1',
    status: 'available'
  });

  await Researcher.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@biotrack.com',
    role: 'Researcher',
    specialization: 'Testing',
    department: 'QA'
  });
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 30000);

// Experiments GET tests
describe('GET /experiments', () => {
  test('should return all experiments with status 200', async () => {
    const res = await request(app).get('/experiments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return a single experiment by id', async () => {
    const all = await request(app).get('/experiments');
    const id = all.body[0]._id;
    const res = await request(app).get(`/experiments/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('should return 404 for non-existent experiment', async () => {
    const res = await request(app).get('/experiments/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});

// Samples GET tests
describe('GET /samples', () => {
  test('should return all samples with status 200', async () => {
    const res = await request(app).get('/samples');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return a single sample by id', async () => {
    const all = await request(app).get('/samples');
    const id = all.body[0]._id;
    const res = await request(app).get(`/samples/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('should return 404 for non-existent sample', async () => {
    const res = await request(app).get('/samples/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});

// Equipment GET tests
describe('GET /equipment', () => {
  test('should return all equipment with status 200', async () => {
    const res = await request(app).get('/equipment');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return a single equipment by id', async () => {
    const all = await request(app).get('/equipment');
    const id = all.body[0]._id;
    const res = await request(app).get(`/equipment/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('should return 404 for non-existent equipment', async () => {
    const res = await request(app).get('/equipment/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});

// Researchers GET tests
describe('GET /researchers', () => {
  test('should return all researchers with status 200', async () => {
    const res = await request(app).get('/researchers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return a single researcher by id', async () => {
    const all = await request(app).get('/researchers');
    const id = all.body[0]._id;
    const res = await request(app).get(`/researchers/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('should return 404 for non-existent researcher', async () => {
    const res = await request(app).get('/researchers/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});