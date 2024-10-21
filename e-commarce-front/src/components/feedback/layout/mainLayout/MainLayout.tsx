import React from 'react'
import { Container } from 'react-bootstrap';
import style from './style.module.css';
function MainLayout() {

  const {container, wrapper} = style;
  return (
    <>
    <Container className={container}>
      <div className={wrapper}>
              hello
      </div>
    </Container>
    </>
  )
}

export default MainLayout;
