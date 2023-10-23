import React from 'react'
import { Link } from 'react-router-dom'
import Vector from '../../../src/Vector.png';
import $ from 'jquery'
export default function Navbar({ userData, logOut }) {

    $(window).scroll(() => {
        let wScroll = $(window).scrollTop();
        if (wScroll > 10) {
            $('nav').css({ 'backgroundColor': '#000000', 'transition': ' all 1.5s', 'padding': '0px 30px ' });
        } else { $('nav').css({ 'backgroundColor': 'transparent', 'padding': '0px 0px ' }); }
    })



    return <>
        <nav className="navbar py-0 fixed-top navbar-expand-lg d-flex justify-content-between">
            <div className="container-fluid ">
                <Link className="navbar-brand d-flex justify-content-center  align-items-center text-white [h1]" to="home"><img className='w-100 pb-3' src={Vector} alt="" /><span className='h2 '>Filmagnet</span></Link>
                <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto ps-lg-5   mb-2 mb-lg-0">
                        {userData ? <>
                            <li className="nav-item">
                                <Link className="nav-link navLinks active text-white before pe-lg-5" aria-current="page" to="home">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navLinks text-white before pe-lg-5" to="movies">MOVIES</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navLinks text-white before pe-lg-5" to="tvshow">TVSHOW</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navLinks text-white before pe-lg-5" to="people">PEOPLE</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fav  text-white before pe-lg-5" to="favorite">FAVORITE <i className="ps-2 fa-solid fa-heart fa-bounce"></i> </Link>
                            </li>
                        </> : ""}




                    </ul>

                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>

                        <li className='pe-3 d-flex justify-content-center align-items-center'>
                            <a className='navLinks' target="_blank" href="https://www.facebook.com/ahmedshaltout3g/"><i className="fa-brands  fa-facebook p-2"></i></a>
                            <a className='navLinks' target="_blank" href="https://www.instagram.com/ahmed_shaltout_3g/"><i className="fa-brands fa-instagram px-2"></i></a>
                            <a className='navLinks' target="_blank" href="https://github.com/Ahmed-Shaltout3g"> <i className="fa-brands fa-github p-2"></i></a>
                            <a className='navLinks' target="_blank" href="https://www.linkedin.com/in/ahmed-shaltout-015b85252/"> <i className="fa-brands fa-linkedin p-2"></i></a>
                        </li>
                        {userData ? <>
                            <li className='d-flex  align-items-center'><span className='nav-link text-white '>Welcome <span className='bg-info p-2 rounded-4'>{userData.name} {userData.phone}</span></span></li>
                            <li className='d-flex  align-items-center'>
                                <span onClick={logOut} className='nav-link btn-style navLinks text-white cursor'>Log Out<i className=" ps-1 fa-solid fa-arrow-right-from-bracket"></i></span>

                            </li>
                        </> : <><li>
                            <Link className="nav-link p-2 btn-style navLinks text-white me-1  " to="/">Login</Link>

                        </li>
                            <li>
                                <Link className="nav-link btn-style navLinks p-2 text-white" to="register">Register</Link>
                            </li></>}

                    </ul>

                </div>
            </div >
        </nav >
    </>
}


