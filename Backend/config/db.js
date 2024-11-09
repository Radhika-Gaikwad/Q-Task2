
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Cdata';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Export the mongoose instance for use in other parts of your app
module.exports = mongoose;
