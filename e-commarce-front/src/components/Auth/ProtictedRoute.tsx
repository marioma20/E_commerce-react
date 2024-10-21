import React from 'react';
import { useAppSelector } from '@store/hooks';
import { Navigate } from 'react-router-dom';

const ProtictedRoute =({children}:{children: React.ReactNode}) =>{
    const {accessToken} = useAppSelector((state)=>state.AuthReducer);
    if(!accessToken){
       return <Navigate to={`/login?message=login_require`}/> 
    }
  return (
    <>
      {children}
    </>
  )
}

export default ProtictedRoute
