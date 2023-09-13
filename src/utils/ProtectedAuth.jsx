import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ProtectedAuth = ({children}) => {
    const {user} = useContext(AuthContext)
    console.log(user);
    console.log('child');
    // console.log(children, <Outlet />);
  return (
    <div>
        {user ? <Outlet /> : <Navigate to='/login' />}
    </div>
  )
}

export default ProtectedAuth