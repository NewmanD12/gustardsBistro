import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './LocalFarmers.css'
import { useAuth } from '../Hooks/Auth';
import axios from 'axios';
import LocalFarmer from '../components/LocalFarmer';

const LocalFarmers = (props) => {

  const { localFarmersEndpoint, localFarmers } = props


  // console.log(localFarmers)

  return (
    <>  
        <Container fluid>
          <Row className='justify-content-center text-center mt-5'>
            <Col>
              <h1>Meet Our Local Farmers</h1>
            </Col>
          </Row>
          <Row className='local-farmer-rows justify-content-center text-center mt-5'>
            {localFarmers.map((farmer, index) => {
              return  <Col xs={12} key={index}>
                        <LocalFarmer
                          farmer={farmer}
                          localFarmersEndpoint={localFarmersEndpoint}
                        />
                      </Col>
            })}
          </Row>
        </Container>
    </>
  )
}

export default LocalFarmers