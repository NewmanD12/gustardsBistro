import { Container, Row, Col } from 'react-bootstrap'
import './UnderConstruction.css'


import React from 'react'

const UnderConstruction = () => {

  const CallTo = ({phone, children}) => {
    return <a href={`tel:${phone}`} id='phoneNumber'>{children}</a>;
  }

  return (
    <Container fluid id='under-construction-body'>
        <Row className='justify-content-center text-center mx-5'>
            <Col md={8}>
                <h1>The Tasting Room is a great place to have small intimate parties and dinners. Please give us a call at <CallTo phone="+13045362274">{`(304) 536-2274`}</CallTo> or email us at gustardsbistro@gmail.com if you would like to book an event.</h1>
            </Col>
        </Row>
    </Container>
  )
}

export default UnderConstruction