const mongoose = require('mongoose');
const Contact = require('./models/Contact');
require('dotenv').config();

const seedData = [
  {
    firstName: 'Sean',
    lastName: 'Onen',
    email: 'songaya@byupathway.edu',
    favoriteColor: 'Turquiose',
    birthday: '1999-04-19'
  },
  {
    firstName: 'Ian',
    lastName: 'Beckham',
    email: 'ian123@gmail.com',
    favoriteColor: 'Green',
    birthday: '2001-03-22'
  },
  {
    firstName: 'Cherish',
    lastName: 'Timothy',
    email: 'cherish788@yaho.com',
    favoriteColor: 'Red',
    birthday: '2005-07-10'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await Contact.deleteMany({});
  const contacts = await Contact.insertMany(seedData);
  console.log(`✅ Seeded ${contacts.length} contacts`);

  await mongoose.disconnect();
  console.log('✅ Done');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});