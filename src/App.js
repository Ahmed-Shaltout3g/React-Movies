import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Movies from "./components/Movies/Movies";
import TVShow from "./components/Tvshow/TVShow";
import People from "./components/People/People";
import Notfound from "./components/Notfound/Notfound";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProdectedRoute from "./components/ProdectedRoute/ProdectedRoute";
import MoviesDetails from "./components/MoviesDetails/MoviesDetails";
import { authContext } from "./Context/AuthContext";
import $ from "jquery";
import Favorite from "./components/Favorite/Favorite";
import { Offline, Online } from "react-detect-offline";
import { mediaContext } from "./Context/MediaContext";

export default function App() {
  let { userData, setData } = useContext(authContext);
  let { favIds, favItems } = useContext(mediaContext);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      DtataToken();
    }
  }, []);

  function logOut() {
    localStorage.removeItem("userData");
    localStorage.removeItem("favMove");
    localStorage.removeItem("favIds");
    favIds.length = 0;
    favItems.length = 0;

    setData(null);
    return <Navigate to="/login" />;
  }
  function DtataToken() {
    let tokenDecode = localStorage.getItem("userData");
    let dataDecode = jwtDecode(tokenDecode);
    setData(dataDecode);
  }
  // button up ++++++++++++++++++++++++++++++++++++++

  $(window).scroll(() => {
    let wScroll = $(window).scrollTop();
    if (wScroll > 15) {
      $(".button-up").fadeIn(1000);
    } else {
      $(".button-up").fadeOut(1000);
    }
  });

  function buttonUp() {
    $("html,body").animate({ scrollTop: 0 }, 1000);
  }

  const router = createHashRouter([
    {
      path: "/",

      element: <Layout userData={userData} logOut={logOut} />,
      children: [
        {
          index: true,
          element: <Login setData={DtataToken} />,
        },
        {
          path: "/home",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <Home />
            </ProdectedRoute>
          ),
        },
        {
          path: "/movies",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <Movies />
            </ProdectedRoute>
          ),
        },

        {
          path: "/people",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <People />
            </ProdectedRoute>
          ),
        },
        {
          path: "/favorite",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <Favorite />
            </ProdectedRoute>
          ),
        },
        {
          path: "/movieDetails/:id/:media_type",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <MoviesDetails />
            </ProdectedRoute>
          ),
        },
        {
          path: "/tvshow",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <TVShow />
            </ProdectedRoute>
          ),
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return (
    <>
      <div>
        <Offline>
          <div class="offline">
            <div>
              <i className="fa-2xl   fa-solid fa-wifi"></i>
              <h1 className="mt-3">OFFLINE</h1>
              <h4>Please check your internet connection</h4>
            </div>
          </div>
        </Offline>
      </div>
      <button onClick={buttonUp} className="btn  button-up">
        <i className="fa-solid text-white fa-arrow-up"></i>
      </button>
      <RouterProvider router={router} />
    </>
  );
}
