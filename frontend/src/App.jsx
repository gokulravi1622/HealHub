import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import Layout1 from '../src/components/Layout';
import Layout2 from './components/Layout2';
import Layout3 from './components/Layout3';
import Home from '../src/pages/Customer/Home';
import About from '../src/pages/Customer/About';
import Contact from '../src/pages/Customer/Contact';
import Signin from '../src/pages/Signin/Signin';
import Signup from '../src/pages/SignUp/Signup';
import Loggedin from './pages/Customer/Loggedin';
import Adminhome from './pages/Admin/Adminhome';
import Addproduct from './pages/Admin/Addproduct';
import Manageuser from './pages/Admin/Manageuser';
import Profile from './pages/Customer/Profile';
import ChangePassword from './pages/Customer/ChangePassword';
import Category from './pages/Customer/Category';
import BuyProduct from './pages/Customer/BuyProduct';
import AddToCartPage from './pages/Customer/AddToCart';
import Success from './pages/Customer/Success';
import Order from './pages/Customer/Orders';
import Manageproduct from './pages/Admin/ManageProducts';
import Paymenthistory from './pages/Admin/Paymenthistory';

function App() {
    // Get user authentication status from redux store
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };
    const isAuthenticated = useSelector(state => state.auth.user !== null);
    console.log('IsAuthenticated:', isAuthenticated); 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout1 />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                {/* Customer routes */}
                <Route path="/customer" element={isAuthenticated ? <Layout2 /> : <Navigate to="/signin" />}>
                    <Route index element={<Loggedin />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="buyproduct" element={<BuyProduct addToCart={addToCart} cartItems={cartItems} />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="changepass" element={<ChangePassword />} />
                    <Route path="category" element={<Category addToCart={addToCart} cartItems={cartItems} />} />
                    <Route path="addtocart" element={<AddToCartPage cartItems={cartItems} setCartItems={setCartItems} setOrders={setOrders} />} />
                    <Route path="success" element={<Success />} />
                    <Route path="order" element={<Order cartItems={cartItems} setCartItems={setCartItems} setOrders={setOrders} />} />
                </Route>
                {/* Admin routes */}
                <Route path="/admin" element={isAuthenticated ? <Layout3 /> : <Navigate to="/signin" />}>
                    <Route index element={<Adminhome />} />
                    <Route path="addproduct" element={<Addproduct />} />
                    <Route path="manageuser" element={<Manageuser />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="changepass" element={<ChangePassword />} />
                    <Route path="manageproduct" element={<Manageproduct />} />
                    <Route path="paymenthistory" element={<Paymenthistory />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
