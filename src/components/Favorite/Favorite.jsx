import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { mediaContext } from '../../Context/MediaContext'
import axios from 'axios';
import { Helmet } from "react-helmet";

export default function Favorite() {
    let { favItems, favIds } = useContext(mediaContext)
    let [items, setItems] = useState((Array.from(new Set(JSON.parse(localStorage.getItem("favMove"))))))
    let [idMedia, setIdMedia] = useState(Array.from(new Set(JSON.parse(localStorage.getItem("favIds")))))
    let [ids, setIds] = useState([])
    let [media_types, setmedia_type] = useState([])
    let [isRemove, setIsRemove] = useState(false)
    let [noItems, setNoitems] = useState(false)








    useEffect(() => {



        console.log(media_types);
        let media_type = idMedia.map(({ media_type }) => media_type);
        setmedia_type(media_type)
        let id = idMedia?.map(({ id }) => id);
        setIds(id)
        console.log(media_types);


    }, [])

    function deletefav(index) {
        items.splice(index, 1)
        localStorage.setItem('favMove', JSON.stringify(items));
        favItems.pop();
        ids.splice(index, 1)
        media_types.splice(index, 1)
        favIds.pop()
        idMedia.splice(index, 1)
        localStorage.setItem('favIds', JSON.stringify(idMedia));



        if (isRemove == true) {
            setIsRemove(false)

        } else {
            setIsRemove(true)

        }


    }

    function deleteAll() {
        localStorage.setItem('favMove', JSON.stringify([]));
        localStorage.setItem('favIds', JSON.stringify([]));
        favIds.length = 0
        media_types.length = 0
        favItems.length = 0;
        items.length = 0

        if (isRemove == true) {
            setIsRemove(false)

        } else {
            setIsRemove(true)

        }



    }


    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Favorits</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>



        <div className='container mt-5'>
            <div className="row align-items-center ">
                <div className="col-md-7">
                    <h2 className='mt-5 color'>Favorite :</h2>

                </div>
                <div className="col-md-5">
                    <button onClick={deleteAll} className='btn btn-danger w-25 mt-5 '>clear All</button>

                </div>
            </div>
            <div className="row mt-5">
                {!JSON.parse(localStorage.getItem("favMove")) ? <p className='fa-2xl text-danger'>No items yet</p> : ''}


                {items?.map((item, index) =>
                (

                    <div key={index} className="col-md-3   mt-5 position-relative ">
                        <div onClick={() => { deletefav(index) }} className='posi'><i className="fa-solid fa-xmark fa-2xl"></i></div>
                        <Link to={`/movieDetails/${ids[index]}/${media_types[index]}`}>
                            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${item}`} alt="" />

                        </Link>
                    </div>)
                )}

            </div></div>
    </>
}
