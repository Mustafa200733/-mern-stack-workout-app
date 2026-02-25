// Importeer Express
import express from 'express';

// Maak Express app
const app = express();

// Haal PORT uit .env
const PORT = process.env.PORT || 4000;

// Middleware: lees JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mijn eerste backend!',
    success: true
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});