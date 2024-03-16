import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { loremIpsum } from 'react-lorem-ipsum';
import './About.css'

const About = () => {
  return (
    <>
        <Container fluid>
          <Row className='justify-content-center text-center mt-5'>
            <Col md={6}>
              <img id='aboutLandingPhoto' src='saltingFish.jpg'/>
            </Col>
          </Row>
          <Row className='justify-content-center text-center mt-5'>
            <Col md={6}>
              <h4>Born and raised in Virginia Beach, Chef Stephen Gustard's culinary journey was ignited by the flavors of his childhood home. His mother's resourcefulness in the kitchen instilled in him a deep love for cooking, setting the stage for a remarkable career in the culinary arts.</h4>
            </Col>
          </Row>
          <Row className='justify-content-center align-items-center text-start mt-4'>
            <Col id='img1' md={6}>
              <img id='flameyDripAbout' src='flamey-drip.jpg'/>
            </Col>
            <Col id='para1' className='mt-4' md={5}>
              <h4>{loremIpsum()}</h4>
            </Col>
          </Row>
          <Row id='secondRow' className='justify-content-center align-items-center text-end mt-4'>
            <Col id='para2' className='mt-4' md={5}>
              <h4>{loremIpsum()}</h4>
            </Col>
            <Col id='img2' md={6}>
              <img id='flameyDripAbout' src='platingSteak.jpg'/>
            </Col>
          </Row>
          
        </Container>
    </>
  )
}

export default About