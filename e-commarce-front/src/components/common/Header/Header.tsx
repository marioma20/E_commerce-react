import React from 'react';
import { useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import HeaderLeftBar from './Headerleftbar/HeaderLeftBar';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { authLogout } from '@store/auth/AuthSlice';
import { actGetWishlist } from '@store/wishlist/WishListSlice';

const {headerContainer , headerLogo, headerLeftBar } = style;

function Header() {
  const disputch = useAppDispatch();
  const {accessToken, user} = useAppSelector((state)=> state.AuthReducer);
  useEffect(() => {
    if (accessToken) {
      disputch(actGetWishlist("ProductIds"));
    }
  }, [disputch, accessToken]);
  
  return (
    <header>
        <div className={headerContainer}>
        <h1 className={headerLogo}>
        <span>our <Badge bg='info'>Ecom</Badge></span>
      </h1>
      <div className={headerLeftBar}>
      <HeaderLeftBar/>
      </div>
        </div>
        <div>
        <Navbar expand="lg" className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="categories">Caregories</Nav.Link>
            <Nav.Link as={NavLink} to="aboutus">About Us</Nav.Link>
          </Nav>
          <Nav>
            {!accessToken ?
             <>
              <Nav.Link as={NavLink} to="login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="register">Register</Nav.Link>
            </>
             : 
            <>
            <NavDropdown title={`Welcome: ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown">
              <NavDropdown.Item
                  as={NavLink}
                  to={'profile'}
                  end
                   >
                    Profile
                   </NavDropdown.Item>
              <NavDropdown.Item
                 as={NavLink}
                 to={'profile/orders'} 
                 end
                 >
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
               as={NavLink}
                to={'/'}
                 onClick={()=>disputch(authLogout())}
                 >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>

    </header>
  )
}

export default Header;
