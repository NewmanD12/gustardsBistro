import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'
import { useNavigate, NavLink } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    const CallTo = ({phone, children}) => {
      return <a href={`tel:${phone}`} id='phoneNumber'>{children}</a>;
    }

    return (  
      <Container fluid id='footer-container' className='mt-5'>
        <Row className='justify-content-center text-center'>
          <Col md={4} className='mt-3' onClick={() => navigate('/')}>
            <img src='/gustardsBistroBlack.png' id='footer-logo'/>
          </Col>
          <Col id='address-col' md={4} className='footer-cols mt-5'>
            <p>759 E Main Street</p>
            <p>White Sulphur Springs, WV 24986</p>
            <CallTo phone="+13045362274">{`(304) 536-2274`}</CallTo>
          </Col>
          <Col md={4} className='footer-cols mt-5' id='hours-of-operation-col'>
            <h4>Hours Of Operation</h4>
            <p>Wednesday - Monday: 11am - 9pm</p>
            <p>Closed Tuesday</p>
          </Col>
        </Row>
        <Row className='justify-content-center text-center my-5'>
          <Col md={6}>
            <p>©2024 All Rights Reserved</p>
          </Col>
          <Col md={6}>
            <NavLink to="/login" id='admin-login'>Admin Login</NavLink>
          </Col>
        </Row>
      </Container>    
    )
}

export default Footer