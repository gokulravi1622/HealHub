const { generateToken } = require('../Config/jwtToken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModels');
const bcrypt = require('bcrypt');
const Product = require('../Models/productModels');

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            // Create a new user
            const newUser = await User.create(req.body);
            res.json(newUser);
        } else {
            // User already exists
            throw new Error("User already exists");
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const findUser = await User.findOne({ email });

        // Logging for debugging
        console.log("User found:", findUser);

        if (!findUser) {
            // User does not exist
            res.status(401);
            throw new Error("User does not exist");
        }

        // Check if password is correct
        const isPasswordMatched = await findUser.isPasswordMatched(password);

        // Logging for debugging
        console.log("Password matched:", isPasswordMatched);

        if (!isPasswordMatched) {
            // Incorrect password
            res.status(401);
            throw new Error("Invalid email or password");
        }

        // Generate and set refresh token
        const refreshToken = generateToken(findUser._id);
        const updatedUser = await User.findByIdAndUpdate(findUser._id, { refreshToken }, { new: true });

        // Set refresh token as cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send user data and token in response
        res.json({
            _id: findUser._id,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            email: findUser.email,
            mobile: findUser.mobile,
            isAdmin: findUser.isAdmin,
            role: findUser.role,
            token: generateToken(findUser._id),
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(401).json({ message: error.message || "Invalid email or password" });
    }
});


const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        throw new Error("Error fetching users");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        throw new Error("Error fetching user");
    }
});

const getUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });  
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
});


const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        throw new Error("Error deleting user");
    }
});

const updateUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        
        // Update user information
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true });
        
        // Send updated user information in response
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
});
const updateUserPasswordByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Check if the current password matches
        const isPasswordMatched = await user.isPasswordMatched(currentPassword);
        if (!isPasswordMatched) {
            res.status(401);
            throw new Error("Current password is incorrect");
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            res.status(400);
            throw new Error("New password and confirm password do not match");
        }

        // Update the password
        user.password = newPassword;

        // Save the updated user
        await user.save();

        // Regenerate token
        const token = generateToken(user._id);

        // Send response with new token
        res.json({ message: "Password updated successfully", token });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Error updating password" });
    }
});


const getCartByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        // Find the user by their email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's cart
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllUsersCarts = asyncHandler(async (req, res) => {
    try {
      // Find all users and populate their carts
      const usersCarts = await User.find({}).select('email cart').populate('cart');
      res.json(usersCarts);
    } catch (error) {
      console.error('Error fetching users\' carts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
const approveOrder = async (req, res) => {
    const { itemId } = req.body;
    const { email } = req.params;
    // Find the user's cart and the specific item to update
    const userCartIndex = usersCarts.findIndex((userCart) => userCart.userId === email);
    if (userCartIndex !== -1) {
      const cart = usersCarts[userCartIndex].cart;
      const itemIndex = cart.findIndex((item) => item._id === itemId);
      if (itemIndex !== -1 && cart[itemIndex].orderStatus === 'pending') {
        // Update the order status to 'dispatch'
        usersCarts[userCartIndex].cart[itemIndex].orderStatus = 'dispatch';
  
        // Send a response indicating success
        res.status(200).json({ message: 'Order status updated successfully.' });
      } else {
        // Item not found or order status not pending
        res.status(404).json({ error: 'Item not found or order status not pending.' });
      }
    } else {
      // User not found
      res.status(404).json({ error: 'User not found.' });
    }
};

const updateUserCart = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { cartItems } = req.body;
  
    try {
      // Find the user by their email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's cart based on the provided cartItems
      user.cart = cartItems;
  
      // Save the updated user object
      await user.save();
  
      // Return a success message
      res.status(200).json({ message: 'User cart updated successfully' });
    } catch (error) {
      console.error('Error updating user cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = {
    createUser,
    loginUserCtrl,
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUserById,
    updateUserByEmail,
    updateUserPasswordByEmail,
    getCartByEmail,
    getAllUsersCarts,
    approveOrder,updateUserCart
};
