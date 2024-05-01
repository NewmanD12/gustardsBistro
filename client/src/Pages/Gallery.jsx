import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Modal, Button} from 'react-bootstrap'

import './Gallery.css'


const Gallery = () => {

  const [showCarousel, setShowCarousel] = useState(false)

  const imgNames = ['garlicShot', 'flamingPan', 'basil', 'drippy', 'plating', 'gyro', 'jqSalt', 'upperJQSalt', 'finishingTouches', 'steak', 'crunchysalad', 'friedsandy', 'glazedsteak', 'potdinner', 'salad', 'chococake']

  return (
    <>
        {showCarousel &&  <Container fluid>
                            <Row className='justify-content-center align-items-center text-center'>
                              <Col 
                                lg={12}
                                id='modal-col'
                              >
                                <Modal
                                  size="xl"
                                  show={showCarousel}
                                  onHide={() => setShowCarousel(false)}
                                  aria-labelledby="example-modal-sizes-title-lg"
                                >
                                  <Modal.Body>
                                    <Carousel>
                                      {imgNames.map((name, index) => {
                                        return  <Carousel.Item key={index}>
                                                  <img
                                                    src={`${name}.jpg`} 
                                                    className='gallery-carousel-imgs' 
                                                    id={name}
                                                  />
                                                </Carousel.Item>
                                      })}                                      
                                    </Carousel>
                                  </Modal.Body>
                                </Modal>
                              </Col>
                            </Row>
                          </Container>
          
        }

        <Container fluid>
          <Row className='justify-content-center align-items-center'>
            {imgNames.map((name, index) => {
                return <Col lg={4} className='mt-3' key={index}>
                          <img
                            src={`${name}.jpg`} 
                            className='gallery-imgs' 
                            id={name}
                            onMouseEnter={() => {
                              const img = document.getElementById(name)
                              img.style.opacity = '.5'
                            }}
                            onMouseLeave={() => {
                              const img = document.getElementById(name)
                              img.style.opacity = '1'
                            }}
                            // onClick={() => {
                            //   setShowCarousel(!showCarousel)
                            // }}
                          />
                        </Col>
            })}
          </Row>
        </Container>
    </>
  )
}

export default Gallery