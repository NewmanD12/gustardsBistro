import React from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import './Welcome.css'
import WelcomeImgCarousel from '../components/WelcomeImgCarousel'


const Welcome = () => {

  return (
    <>
      <Container fluid id='welcome-body'>
        <Row className='justify-content-center text-center'>
          <Col>
            <WelcomeImgCarousel /> 
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Welcome