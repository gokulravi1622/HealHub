const express = require('express');
const router = express.Router();
const User = require('../Models/userModels');
// Import your user and product controllers
const { createUser, loginUserCtrl, getAllUsers, getUserById, deleteUserById, updateUserByEmail, getUserByEmail, updateUserPasswordByEmail, getCartByEmail, getAllUsersCarts, approveOrder,updateUserCart } = require('../Controllers/userCtrl');
const { createProduct, getAllProducts, getAllTypeProduct } = require('../Controllers/productCtrl');

// User routes
router.post("/register", createUser);
router.post("/login", loginUserCtrl); 
router.get("/getAllUsers", getAllUsers);
router.get("/editUser/:id", getUserById); 
router.delete("/deleteUser/:id", deleteUserById);
router.put("/updateUser/:email", updateUserByEmail);
router.get("/getUserByEmail/:email", getUserByEmail);
router.put("/updatePasswordByEmail/:email", updateUserPasswordByEmail);
router.get("/getCartByEmail/:email", getCartByEmail);
router.get("/getAllUsersCarts", getAllUsersCarts);
router.put("/approveOrder", approveOrder);
router.put("/updateUserCart/:email", updateUserCart);

// Product routes
router.post("/product", createProduct);
router.get("/getAllProduct", getAllProducts);
router.get("/getAllTypeProduct", getAllTypeProduct);  
const stripe = require('stripe')('sk_test_51P6IGS083sUohJxxZOwaSu6xXLSJcnocBKQhX8tuhx25FvTaUKvSIQvqLikYIekzvil1H1QrV58wEO5hiG4f1nqL0065kRIygt');
//Checkout route
router.post('/checkout/:email', async (req, res) => {
  try {
      const email = req.params.email;
      const { cartItems } = req.body; // Extract cartItems from request body

      // Find the user by their email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Add the cart items to the user's cart array
      if (cartItems && Array.isArray(cartItems)) {
          user.cart.push(...cartItems);
      } else {
          return res.status(400).json({ message: 'Invalid cart items format' });
      }

      // Save the updated user object
      await user.save();

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: cartItems.map((item) => ({
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: item.productName,
                      description: item.productDescription,
                  },
                  unit_amount: Math.round(item.productPrice * 100),
              },
              quantity: parseInt(item.quantity || 1),
          })),
          mode: 'payment',
          success_url: 'http://localhost:5173/customer/success', // Update with your success URL
          cancel_url: 'http://localhost:5173/customer/addtocart', // Update with your cancel URL
          customer_email: email,
      });

      // Return the session ID to frontend
      res.status(200).json({ sessionId: session.id });
  } catch (error) {
      console.error('Error during checkout:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.put("/updateAddress/:email", async (req, res) => {
  try {
      const email = req.params.email;
      const { address } = req.body; // Extract address from request body

      // Find the user by their email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update user's address
      user.address = address;

      // Save the updated user object
      await user.save();

      res.status(200).json({ message: 'Address updated successfully' });
  } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/payment-history', async (req, res) => {
  try {
    // Fetch payment history from Stripe
    const payments = await stripe.charges.list({ 
      limit: 25, 
      expand: ['data.customer'] // Expand the customer object within each charge
    }); 

    console.log('Stripe API Response:', payments); // Log the Stripe API response to inspect

    // Map over the charges to extract relevant information including customer email
    const formattedPayments = payments.data.map(charge => ({
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      customerEmail: charge.customer ? charge.customer.email : (charge.billing_details ? charge.billing_details.email : 'Unknown'), // Extract customer email if available
      created: charge.created
    }));

    // Log the formatted payments before sending to client
    console.log('Formatted Payments:', formattedPayments);

    // Return formatted payment history to client
    res.status(200).json(formattedPayments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
