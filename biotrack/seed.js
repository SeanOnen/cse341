const mongoose = require('mongoose');
const Experiment = require('./models/Experiment');
const Sample = require('./models/Sample');
const Equipment = require('./models/Equipment');
const Researcher = require('./models/Researcher');
require('dotenv').config();

const experiments = [
  {
    title: 'Soil Microbial Diversity Study',
    description: 'Analysis of microbial communities in agricultural soil samples',
    startDate: '2026-04-01',
    endDate: '2026-06-01',
    status: 'ongoing',
    researcherId: 'R001',
    sampleIds: ['S001', 'S002'],
    equipmentIds: ['E001'],
    results: 'Preliminary results show high microbial diversity'
  },
  {
    title: 'Water Quality Assessment',
    description: 'Testing water samples from local irrigation systems for contaminants',
    startDate: '2026-03-15',
    endDate: '2026-05-15',
    status: 'ongoing',
    researcherId: 'R002',
    sampleIds: ['S003'],
    equipmentIds: ['E002', 'E003'],
    results: ''
  },
  {
    title: 'Plant Growth Hormone Analysis',
    description: 'Studying the effects of biosynthetic hormones on crop yield',
    startDate: '2026-05-01',
    status: 'planned',
    researcherId: 'R001',
    sampleIds: [],
    equipmentIds: [],
    results: ''
  }
];

const samples = [
  {
    name: 'Soil Sample A',
    type: 'Soil',
    source: 'Field Station 1 - North Plot',
    collectionDate: '2026-04-01',
    storageLocation: 'Freezer B - Shelf 2',
    quantity: 500,
    unit: 'grams',
    notes: 'Collected during morning hours, pH 6.8'
  },
  {
    name: 'Soil Sample B',
    type: 'Soil',
    source: 'Field Station 1 - South Plot',
    collectionDate: '2026-04-01',
    storageLocation: 'Freezer B - Shelf 2',
    quantity: 480,
    unit: 'grams',
    notes: 'Collected during morning hours, pH 7.1'
  },
  {
    name: 'Water Sample W1',
    type: 'Water',
    source: 'Irrigation Canal - Entry Point',
    collectionDate: '2026-03-15',
    storageLocation: 'Refrigerator A - Shelf 1',
    quantity: 2,
    unit: 'liters',
    notes: 'Turbidity observed, tested within 24 hours'
  },
  {
    name: 'Leaf Sample L1',
    type: 'Plant Tissue',
    source: 'Greenhouse Plot 3 - Maize',
    collectionDate: '2026-04-10',
    storageLocation: 'Freezer C - Shelf 1',
    quantity: 50,
    unit: 'grams',
    notes: 'Collected from upper canopy leaves'
  },
  {
    name: 'Root Sample R1',
    type: 'Plant Tissue',
    source: 'Greenhouse Plot 3 - Maize',
    collectionDate: '2026-04-10',
    storageLocation: 'Freezer C - Shelf 1',
    quantity: 30,
    unit: 'grams',
    notes: 'Washed and dried before storage'
  }
];

const equipment = [
  {
    name: 'Centrifuge X200',
    type: 'Centrifuge',
    serialNumber: 'CX200-001',
    location: 'Lab Room 3',
    status: 'available',
    lastMaintenance: '2026-01-15',
    nextMaintenance: '2026-07-15'
  },
  {
    name: 'pH Meter Pro',
    type: 'pH Meter',
    serialNumber: 'PHM-002',
    location: 'Lab Room 1',
    status: 'in-use',
    lastMaintenance: '2026-02-01',
    nextMaintenance: '2026-08-01'
  },
  {
    name: 'Spectrophotometer S100',
    type: 'Spectrophotometer',
    serialNumber: 'SP100-003',
    location: 'Lab Room 2',
    status: 'available',
    lastMaintenance: '2026-03-01',
    nextMaintenance: '2026-09-01'
  },
  {
    name: 'Autoclave A500',
    type: 'Autoclave',
    serialNumber: 'AC500-004',
    location: 'Sterilization Room',
    status: 'maintenance',
    lastMaintenance: '2026-03-20',
    nextMaintenance: '2026-04-20'
  }
];

const researchers = [
  {
    firstName: 'Sean',
    lastName: 'Onen',
    email: 'sean@biotrack.com',
    role: 'Lead Researcher',
    specialization: 'Soil Microbiology',
    department: 'Biosystems Engineering'
  },
  {
    firstName: 'Stephen',
    lastName: 'Isiko',
    email: 'stephen@biotrack.com',
    role: 'Research Associate',
    specialization: 'Water Quality Analysis',
    department: 'Biosystems Engineering'
  },
  {
    firstName: 'Jane',
    lastName: 'Nakato',
    email: 'jane@biotrack.com',
    role: 'Lab Technician',
    specialization: 'Plant Biology',
    department: 'Agricultural Sciences'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await Experiment.deleteMany({});
  await Sample.deleteMany({});
  await Equipment.deleteMany({});
  await Researcher.deleteMany({});

  await Experiment.insertMany(experiments);
  console.log(`✅ Seeded ${experiments.length} experiments`);

  await Sample.insertMany(samples);
  console.log(`✅ Seeded ${samples.length} samples`);

  await Equipment.insertMany(equipment);
  console.log(`✅ Seeded ${equipment.length} equipment`);

  await Researcher.insertMany(researchers);
  console.log(`✅ Seeded ${researchers.length} researchers`);

  await mongoose.disconnect();
  console.log('✅ Done');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});