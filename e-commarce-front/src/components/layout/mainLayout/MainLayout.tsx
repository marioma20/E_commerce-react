import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import style from './style.module.css';
import { Header, Footer } from '../../common/Header';
function MainLayout() {

  const {container, wrapper} = style;
  return (
    <>
    <Container className={container}>
      <Header/>
      <div className={wrapper}>
        <Outlet/>
      </div>
      <Footer/>
    </Container>
    </>
  )
}

export default MainLayout;
