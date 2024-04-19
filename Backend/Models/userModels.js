const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        default: "user",
    },
    cart: [{
        productName: String,
        productDescription: String,
        productPrice: Number,
        orderStatus: { type: String, default: 'pending' } // Default to 'pending'
        // Other properties as needed
    }],
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    Wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);
