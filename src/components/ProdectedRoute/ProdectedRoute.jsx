import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login';

export default function ProdectedRoute({ setData, userData, children }) {
    if (userData == null) {
        return <Login setData={setData} />
    }
    else {
        return children;

    }

}
