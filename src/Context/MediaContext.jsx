import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let mediaContext = createContext('');
export function MediaContextProvider(props) {
    let [movies, setMovies] = useState([]);
    let [tv, setTv] = useState([]);
    let [people, setpeople] = useState([]);
    let [moviesPages, setMoviesPages] = useState([]);
    const [favItems, setFavItems] = useState([]);
    const [favIds, setFavIds] = useState([]);



    let [peoplePages, setpeoplePages] = useState([]);
    let [tvPages, settvPages] = useState([]);
    let [currentPage, setCurrentPage] = useState(1)








    async function getTrending(mediaType, DataStorage) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=0038e84a95103de713f1f6fa0401fac8`);
        DataStorage(data.results)
    }

    async function getpages(mediaType, DataStorage, page) {
        try {
            let { data } = await axios.get(`https://api.themoviedb.org/3/discover/${mediaType}?page=${page}&api_key=0038e84a95103de713f1f6fa0401fac8`);
            DataStorage(data.results)

        } catch (error) {
            console.log(error);
        }
    }
    async function getpagespeople(DataStorage, page) {
        try {
            let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}&api_key=0038e84a95103de713f1f6fa0401fac8`);
            DataStorage(data.results)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getTrending('movie', setMovies);
        getTrending('tv', setTv);
        getTrending('person', setpeople);
        getpages('movie', setMoviesPages, currentPage);
        getpages('tv', settvPages, currentPage);
        getpagespeople(setpeoplePages, currentPage);


    }, []);


    return <mediaContext.Provider value={{ movies, tv, people, moviesPages, peoplePages, tvPages, getpages, favIds, setMoviesPages, getpagespeople, setpeoplePages, settvPages, favItems }}>
        {props.children}
    </mediaContext.Provider>

}