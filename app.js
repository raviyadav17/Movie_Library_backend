const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

// Define CORS options
const corsOptions = {
    origin: 'https://movie-library-frontend.netlify.app',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  
  app.use(express.json());

app.get('/',(req, res) => {
    res.status(201).json("server started");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/listRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
