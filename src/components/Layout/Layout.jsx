import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
export default function Layout({ userData, logOut }) {
    return (
        <div>
            <Navbar userData={userData} logOut={logOut} />

            <Outlet ></Outlet>

            <Footer />
        </div>
    )
}

