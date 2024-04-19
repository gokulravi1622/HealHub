//frontend/src/components/Layout3.jsx
import React from 'react';
import {Outlet} from 'react-router-dom';
import Header3 from './Header3';
import Footer from './Footer';

const Layout3 = () =>{
    return (
        <>
            <Header3 />
            <Outlet />
            <Footer />
        </>
    )
};
export default Layout3;