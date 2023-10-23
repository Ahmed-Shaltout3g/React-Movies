import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { mediaContext } from '../../Context/MediaContext';
import { Helmet } from 'react-helmet';


export default function Home() {

    let { movies, tv, people } = useContext(mediaContext)



    function getYear(x) {
        const d = new Date(x)
        return d.getFullYear()
    }


    const options = {
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        loop: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 7,

            }
        },
    };



    return <>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <header className={style.hero}>
            <div className={`${style.headerText}`}>
                <div className='container mt-lg-5 ps-lg-5'>
                    <h3>Filmagnet</h3>
                    <h1>Unlimited <span className='h1'>Entertainment</span> ,<br />Movies, TVs shows, & More.</h1>

                    <div className={`${style.subtext} d-flex`}>
                        <p className='bg-white text-black px-1 me-3'>Movies</p>
                        <p className='border px-1 '>HD</p>
                        <p className='ps-4 pt-1 h5'>Action, Drama</p>
                        <p className='ps-4 pt-1'><i className="pe-2 fa-solid fa-calendar-days"></i>2023</p>

                    </div></div>
            </div>

        </header>


        <section className={`${style.movies} back w-100`}>
            <div className={`${style.title} pb-3`}>
                <h3 className={`${style.color} `}>Movies</h3>
                <h1>Trending Movies </h1>
            </div>
            <div className="container">

                <div className="row g-lg-5">

                    {movies.slice(0, 4).map((movie, index) => (
                        <div key={index} className="col-md-3 ">
                            <Link to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                                <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />
                                <div className='d-flex justify-content-between  mt-3'>
                                    <h1 className='h5 pe-2'>{movie.title}</h1>
                                    <h1 className={`${style.color} h5`}>{getYear(movie.release_date)}</h1>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className='border px-1 '>HD</p>
                                    <p><i className={`${style.color} fa-solid fa-star`}></i> {movie.vote_average} </p>
                                </div>
                            </Link>
                        </div>

                    ))}

                </div>

            </div>



            {/* 
            <OwlCarousel className='owl-theme pt-5' {...options} >
                {movies.slice(4).map((movie, index) => (
                    <Link className={``} key={index} to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                        <div className={`${style.hover}  position-relative`}>
                            <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />

                            <div className={style.item}>
                                <h1 className='h6 pb-2'>{movie.title}</h1>
                                <p><i className={`${style.color} fa-solid fa-star`}></i> {movie.vote_average} </p>


                            </div>
                        </div>
                    </Link>
                ))}
            </OwlCarousel> */}

            <OwlCarousel className='owl-theme pt-5' {...options}>
                {movies.slice(4).map((movie, index) => (
                    <Link key={index} to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                        <div className='item'>
                            <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />
                        </div>
                    </Link>
                ))}
            </OwlCarousel>



            <div className={`${style.title} pb-3 mt-4`}>
                <h3 className={`${style.color} `}>TV</h3>
                <h1>Trending Tv Show </h1>
            </div>
            <div className="container">

                <div className="row g-lg-5">

                    {tv.slice(0, 4).map((movie, index) => (

                        <div key={index} className="col-md-3 ">
                            <Link to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                                <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />
                                <div className='d-flex justify-content-between  mt-3'>
                                    <h1 className='h5 pe-2'>{movie.name}</h1>
                                    <h1 className={`${style.color} h5`}>{getYear(movie.first_air_date)}</h1>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className='border px-1 '>HD</p>
                                    <p><i className={`${style.color} fa-solid fa-star`}></i> {movie.vote_average} </p>
                                </div>
                            </Link>
                        </div>

                    ))}

                </div>

            </div>


            <OwlCarousel className='owl-theme pt-5' {...options}>
                {tv.slice(4).map((movie, index) => (
                    <Link key={index} to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                        <div className='item'>
                            <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />
                        </div>
                    </Link>
                ))}
            </OwlCarousel>

            <div className={`${style.title} pb-3 mt-4`}>
                <h3 className={`${style.color} `}>People</h3>
                <h1>Trending Person </h1>
            </div>
            <div className="container">

                <div className="row g-lg-5">

                    {people.slice(0, 4).map((movie, index) => (

                        <div key={index} className="col-md-3 ">
                            <Link to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                                <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.profile_path} alt="" />
                                <div className='d-flex justify-content-between  mt-3'>
                                    <h1 className='h5 pe-2'>{movie.name}</h1>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className='border px-1 '>HD</p>
                                    <p><i className={`${style.color} fa-solid fa-star`}></i> {movie.popularity} </p>
                                </div>
                            </Link>
                        </div>

                    ))}

                </div>

            </div>

            <OwlCarousel className='owl-theme pt-5' {...options}>
                {people.slice(4).map((movie, index) => (
                    <Link key={index} to={`/movieDetails/${movie.id}/${movie.media_type}`}>
                        <div className='item'>
                            <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.profile_path} alt="" />
                        </div>
                    </Link>
                ))}
            </OwlCarousel>


        </section>


    </>

}   
