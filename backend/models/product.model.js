import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

/*
   This says to mongoose, "Create a model called 'Product' using the productSchema defined above."
*/
const Product = mongoose.model('Product', productSchema);

export default Product;