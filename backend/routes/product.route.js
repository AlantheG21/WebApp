import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Endpoint to create a new product
router.post("/", createProduct);

// Endpoint to delete a product by ID
router.delete("/:id", deleteProduct);

// Endpoint to get all products
router.get("/", getProducts);

// Endpoint to update a product by ID
router.put("/:id", updateProduct);

export default router;