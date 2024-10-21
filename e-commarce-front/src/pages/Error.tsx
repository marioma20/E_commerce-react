import React from 'react';
import Lottie from "lottie-react";
import { LottieHandler } from '@components/feedback/layout';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Error =()  =>{

  return (
    <Container className="notFound">
      <div className='d-flex flex-column align-items-center'>
      <LottieHandler type="notFound"/>
      <Link to={'/'} replace={true}>
      How about going back to safety?
      </Link>
      </div>
    </Container>
  )
}

export default Error;
