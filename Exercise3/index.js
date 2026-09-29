import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;



app.use(express.json());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.get ("/", (req, res) => {
  res.send("Welcome to the API. Use /auth for authentication and /admin for admin routes.");
});

app.use(notFound);
app.use(errorHandler);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB connection error:', err));