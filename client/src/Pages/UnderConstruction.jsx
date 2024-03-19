import { Container, Row, Col } from 'react-bootstrap'
import './UnderConstruction.css'


import React from 'react'

const UnderConstruction = () => {
  return (
    <Container fluid id='under-construction-body'>
        <Row className='justify-content-center text-center'>
            <Col md={8}>
                <h1>This Page is Currently Under Construction. Please Come Back Later!</h1>
            </Col>
        </Row>
    </Container>
  )
}

export default UnderConstruction