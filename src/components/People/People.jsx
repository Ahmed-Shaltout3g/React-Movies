import React, { useContext, useState } from 'react'
import { mediaContext } from '../../Context/MediaContext';
import { Link } from 'react-router-dom';
import avatar from '../../avatar2.jpg'
import Pagination from '../Pagination/Pagination';
import { Helmet } from 'react-helmet';


export default function People() {
    let [termSearch, settermSearch] = useState('')

    let { peoplePages } = useContext(mediaContext);
    console.log(peoplePages);
    function getYear(x) {
        const d = new Date(x)
        return d.getFullYear()
    }
    return <>


        <Helmet>
            <meta charSet="utf-8" />
            <title>People</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        {!peoplePages ? <div className='spinner'><div className="spinner-grow size" role="status">
            <span className="visually-hidden">Loading...</span>
        </div></div> :
            <div className="container padding ">
                <div className="input-wrapper pb-4">
                    <button className="icon">
                        <i className=" color fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input onChange={(event) => { settermSearch(event.target.value) }} placeholder="search.." className="input" name="text" type="text" />
                </div>
                <div className="row g-lg-5">

                    {peoplePages.filter((movie) => {
                        if (termSearch === '') {
                            return movie;
                        } if (movie.name?.toLowerCase().includes(termSearch.toLowerCase())) {
                            return movie;
                        }
                    }).map((movie, index) => (
                        <div key={index} className="col-md-3 ">
                            <Link to={`/movieDetails/${movie.id}/person`}>
                                <img className='w-100' src={movie.profile_path ? 'https://image.tmdb.org/t/p/w500/' + movie.profile_path : `${avatar}`} alt="" />
                                <div className='d-flex justify-content-between  mt-3'>
                                    <h1 className='h5 pe-2'>{movie.name}</h1>
                                    <h1 className={` color h5`}>2023</h1>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className=' px-1 '>{movie.known_for_department}</p>
                                    <p>{movie.popularity}<i className={`ps-1 color fa-solid fa-star`}></i>  </p>
                                </div>
                            </Link>
                        </div>

                    ))}
                </div>
                <Pagination media={'people'} />

            </div>}
    </>
}
