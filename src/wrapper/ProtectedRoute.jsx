import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
 
    if (localStorage.getItem('token') === null ) {
        return <Navigate to={'/login'} replace />
    }
  return (
    <Outlet />
  )
}

export default ProtectedRoute