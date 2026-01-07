import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
const __dirname = path.resolve(); // Get current directory path

app.use("/api/products", productRoutes)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); // Serve static files from the React app

    // Fallback: serve index.html for any non-API routes.
    // Use a pathless handler to avoid path-to-regexp parsing issues caused by wildcard patterns.
    app.use((req, res, next) => {
        // Let API routes pass through
        if (req.path.startsWith('/api')) return next();
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});