import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";

const PcsAdminHome = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
          <AdminSidebar defaultKey={"Home"} />
          </Col>
          <Col xs={9} id="page-content">
            Page content here
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
