

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
 
// Connect to MongoDB
async function mongooseConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'userDb',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = mongooseConnect;
