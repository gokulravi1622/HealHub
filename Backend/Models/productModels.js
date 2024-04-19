const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number, // Assuming productPrice is a numeric value
        required: true,
    }, 
    productImage: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['nutrition', 'medicine', 'beauty'], // Define the allowed types
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);
