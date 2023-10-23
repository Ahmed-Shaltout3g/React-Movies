import React, { useContext, useState } from 'react'
import { mediaContext } from '../../Context/MediaContext';
import { Link } from 'react-router-dom';
import avatar from '../../avatar2.jpg'
import Pagination from '../Pagination/Pagination';

import $ from 'jquery';
import { Helmet } from 'react-helmet';
export default function TVShow() {
    let [termSearch, settermSearch] = useState('')
    let { tvPages } = useContext(mediaContext);
    console.log(tvPages);
    function getYear(x) {
        const d = new Date(x)
        return d.getFullYear()
    }
    console.log(termSearch);



    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>TV Shows</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        {!tvPages ? <div className='spinner'><div className="spinner-grow size" role="status">
            <span className="visually-hidden">Loading...</span>
        </div></div> :
            <div className="container padding">
                <div className="input-wrapper pb-4">
                    <button className="icon">
                        <i className=" color fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input onChange={(event) => { settermSearch(event.target.value) }} placeholder="search.." className="input" name="text" type="text" />
                </div>

                <div className="row g-lg-5">

                    {tvPages.filter((movie) => {
                        if (termSearch === '') {
                            return movie;
                        } if (movie.original_name?.toLowerCase().includes(termSearch.toLowerCase())) {
                            return movie;
                        }
                    }).map((movie, index) => (
                        <div key={index} className="col-md-3 ">
                            <Link to={`/movieDetails/${movie.id}/tv`}>
                                <img className='w-100' src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : `${avatar}`} alt="" />
                                <div className='d-flex justify-content-between  mt-3'>
                                    <h1 className='h5 pe-2'>{movie.original_name}</h1>
                                    <h1 className={` color h5`}>{getYear(movie.first_air_date)}</h1>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className='border px-1 '>HD</p>
                                    <p>{movie.vote_average}<i className={`ps-1 color fa-solid fa-star`}></i>  </p>
                                </div>
                            </Link>
                        </div>

                    ))}
                </div>
                <Pagination media={'tv'} />

            </div>}
    </>
}
