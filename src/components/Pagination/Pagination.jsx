import React, { useState, useContext, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
// import { Link, useParams } from 'react-router-dom';
import { mediaContext } from '../../Context/MediaContext'
import $ from 'jquery'
export default function Pagination({ media }) {
    let { getpages, setMoviesPages, getpagespeople, setpeoplePages, settvPages } = useContext(mediaContext);

    console.log(media);


    function handlePageClick(page) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        let currentPage = page.selected + 1
        if (media == 'movie') {
            getpages('movie', setMoviesPages, currentPage)
        } else if (media == 'people') {
            getpagespeople(setpeoplePages, currentPage)

        } else {
            getpages('tv', settvPages, currentPage)

        }


    }


    return <>


        <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={30}
            previousLabel="<< "
            marginPagesDisplayed={3}
            containerClassName={'pagination justify-content-center mt-4'}
            pageLinkClassName={'page-link'}
            pageClassName={'page-item'}
            activeClassName={'active'}
            nextClassName={'page-link'}
            previousClassName={'page-link'}
            breakClassName={'page-link'}
            hrefBuilder={''}
        />

    </>
}
