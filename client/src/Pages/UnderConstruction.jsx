import { Container, Row, Col } from 'react-bootstrap'
import './UnderConstruction.css'


import React from 'react'

const UnderConstruction = () => {
  return (
    <Container fluid id='under-construction-body'>
        <Row className='justify-content-center text-center mx-5'>
            <Col md={8}>
                <h1>The Tasting Room will open it's doors May 1st as we work on a fun and creative menu. We look forward to serving you with our upscale dining experience.</h1>
            </Col>
        </Row>
    </Container>
  )
}

export default UnderConstruction