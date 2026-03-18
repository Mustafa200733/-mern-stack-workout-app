// server.js
import express from 'express';
import mongoose from 'mongoose';
import workoutRoutes from './src/routes/workoutRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;


const devOriginRegex = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (devOriginRegex.test(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
  })
);

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);

// Verbind met MongoDB en start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');
    
    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });