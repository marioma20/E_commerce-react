import React from 'react';
import { Row, Col, ListGroup } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <Row>
    <Col md={3}>
      <ListGroup>
        <ListGroup.Item as={NavLink} to="" end>
          Account Info
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="orders" end>
          Orders
        </ListGroup.Item>
      </ListGroup>
    </Col>
    <Col>
      <Outlet />
    </Col>
  </Row>
  )
}

export default ProfileLayout;
