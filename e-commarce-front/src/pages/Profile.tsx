import React from 'react';
import { useAppSelector } from '@store/hooks';
import { Heading } from '@components/common/Header';

const Profile =() =>{
  const accountInfo = useAppSelector((state)=>state.AuthReducer.user);
  return (
    <>
    <Heading title="Account Info" />
    <ul>
    <li>ID: {accountInfo?.id}</li>
      <li>First Name: {accountInfo?.firstName}</li>
      <li>Last Name: {accountInfo?.lastName}</li>
      <li>Email: {accountInfo?.email}</li>
    </ul>
  </>
  )
}

export default Profile
