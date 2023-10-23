import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Favorite from './../Favorite/Favorite';
import $ from 'jquery'
import { mediaContext } from '../../Context/MediaContext';
import { Helmet } from 'react-helmet';

export default function MoviesDetails() {

    let { favItems, favIds, setFavItems, setFavIds } = useContext(mediaContext)
    let { id, media_type } = useParams();
    const [items, setitems] = useState({});
    const [fav, setfav] = useState(false);
    let [isRemove, setIsRemove] = useState(false)


    const [itemsSimilar, setItemsSimilar] = useState([]);

    async function getItemByID(id, media_type) {
        let { data } = await axios(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=0038e84a95103de713f1f6fa0401fac8`);
        setitems(data);
    }
    async function getsimilar(media_type, id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=0038e84a95103de713f1f6fa0401fac8`);
        setItemsSimilar(data.results)
    }



    useEffect(() => {

        if (media_type == 'person') {
            getItemByID(id, media_type)


        } else {
            getsimilar(media_type, id)
            getItemByID(id, media_type)
        }


    }, [])

    useEffect(() => {
        // setIsLoading(true)
        setfav(false)

        getItemByID(id, media_type)

        if (media_type != 'person') {
            getsimilar(media_type, id)

        }
    }, [id])

    const options = {
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        loop: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 3,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 9,

            }
        },
    };

    function addfavorite(poster_path, id) {
        if (fav) {
            setfav(false)
            let retString = localStorage.getItem("favMove")
            let str = localStorage.getItem("favIds")
            let retArray = JSON.parse(retString)
            let favIds = JSON.parse(str)
            favIds.pop([{ id, media_type }])
            retArray.pop(poster_path)
            favItems.pop(poster_path)
            if (isRemove == true) {
                setIsRemove(false)

            } else {
                setIsRemove(true)

            }

        }
        else {




            setfav(true)
            favIds.push({ id, media_type })
            favItems.push(poster_path)
            localStorage.setItem('favIds', JSON.stringify(Array.from(new Set(favIds.map(JSON.stringify))).map(JSON.parse)))
            let string = JSON.stringify(Array.from(new Set(favItems)))
            localStorage.setItem('favMove', string)
            if (isRemove == true) {
                setIsRemove(false)

            } else {
                setIsRemove(true)

            }



        }
    }

    $('.linksa').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);

    });






    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Details</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>


        {items.length ? <div className='spinner'><div className="spinner-grow size" role="status">
            <span className="visually-hidden">Loading...</span>
        </div></div> :
            <header className='overflow-hidden '>

                <div className='hero-img' style={{
                    backgroundImage:
                        `url(https://image.tmdb.org/t/p/w500/${items.backdrop_path ? items.backdrop_path : items.profile_path})`,
                    height: 'auto',
                    margin: 0,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }} >

                    <div className="layer ">
                        <div className="padding container h-auto pt-5">
                            <div className="row gx-5  h-auto   pt-lg-0   ">
                                <div className="col-md-3  mt-3  mt-lg-0">
                                    <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${items.poster_path ? items.poster_path : items.profile_path}`} alt="" />

                                </div>
                                <div className="col-md-7  d-flex h-50  align-items-top">
                                    <div className=" ">
                                        <h1 >{items.name ? items.name : items.title}</h1>
                                        <div className="row ">
                                            <div className="row pt-3 ">
                                                <div className="col-6">
                                                    {items.vote_average ? <p className='text-black  '><span className='bg-white  p-1 px-2 '>Movies ,Tv</span></p> : <p className='h3'>{items.known_for_department}</p>
                                                    }

                                                </div>
                                                <div className=" col-6">
                                                    {items.vote_average ? <p className=''><span className='border p-1 px-2'>HD</span></p> : ''}

                                                </div>
                                            </div>
                                            <div className="row pt-3 ">
                                                {items.genres ? items.genres?.map((ele, index) => (<div key={index} className="col-md-4"> <p className=' pt-1 h4'>{ele.name}</p></div>)) : items.also_known_as?.filter((word, index) => index < 3).map((ele, index) => (<div key={index} className="col-md-4"> <p className=' pt-1 h4'>{ele}</p></div>))}
                                            </div>


                                            <div className='row pt-3'>
                                                <div className='col-md-4'> <p className='h4 '>{items.vote_average ? items.vote_average?.toFixed(1) : items.popularity?.toFixed(2)}  <i className="color ps-1 fa-solid fa-star"></i></p>

                                                </div>
                                                <div className="col-md-4">{items.runtime ? <p className=' h4'>{items.runtime}m <i className="color ps-1 fa-regular fa-clock"></i></p> : items.birthday ? <p className=' h4'>{items.birthday}   <i className=" color ps-1 fa-solid fa-cake-candles"></i></p> : <p className=' h4'>{items.first_air_date}   <i className=" color ps-1 fa-solid fa-cake-candles"></i></p>}</div>

                                                <div className='col-md-4'> <p className=' h4'>2023  <i className="color ps-1 fa-solid fa-calendar-days  "></i></p> </div>
                                            </div>

                                            <div className='pt-3'>
                                                <h3>Overview :</h3>
                                                <p className='h4'>{items.overview ? items.overview?.split(' ').slice(0, 255).join(' ') : items.biography?.split(' ').slice(0, 255).join(' ')}</p>
                                            </div>
                                            <div className='pt-3'>
                                                {media_type == 'movie' || media_type == 'tv' ? <button onClick={() => { addfavorite(items.poster_path, items.id) }} className='btnFav bg-transparent border-0 text-white'><h4 className='h4 fav'>Add To Favorite {fav ? <><i className="ps-2 fa-solid fa-heart fa-bounce icolor"></i>  </> : <i className="ps-2 fa-solid fa-heart fa-bounce text-white"></i>}</h4></button> : ''}
                                            </div>


                                        </div>



                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>




                {media_type != 'person' ? <h1 className='mt-5 ps-lg-2 color'>Similar</h1> : ''}


                {media_type == 'movie' ? <OwlCarousel className='owl-theme pt-5' {...options}>
                    {itemsSimilar.map((movie, index) => (
                        <Link className='linksa' key={index} to={`/movieDetails/${movie.id}/movie`}>
                            <div className='item'>
                                <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />
                            </div>
                        </Link>
                    ))}
                </OwlCarousel> : media_type == 'tv' ? <OwlCarousel className='owl-theme pt-5' {...options}>
                    {itemsSimilar.map((movie, index) => (
                        <Link className='linksa' key={index} to={`/movieDetails/${movie.id}/tv`}>
                            <div className='item'>
                                <img className='w-100' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" />
                            </div>
                        </Link>
                    ))}
                </OwlCarousel> : ''}


            </header >}
    </>
}

