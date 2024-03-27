import React, { useState } from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import axios from "axios";
import './CreateNewFarmer.css'


const CreateNewFarmer = (props) => {

  const { localFarmersEndpoint } = props
  
  const [newLocalFarmer, setNewLocalFarmer] = useState({})
  const [showAddContactInfo, setShowAddContactInfo] = useState(false)
  const [value, setValue] = useState()

  const handleChange = (e) => {
    setNewLocalFarmer({
      ...newLocalFarmer, 
      [e.target.name] : e.target.value
    })
  }

  const submitNewFarmer = (e) => {
    e.preventDefault()
    const localFarmer = {
      ...newLocalFarmer,
      "phoneNumber" : value
    }

    axios.post(`${localFarmersEndpoint}/create-local-farmer`, localFarmer)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err))
          .finally(() => {
            alert('Local Farmer Created')
            window.location.reload(false)
          })
    
    
  }

  return (
    <Container fluid className='mt-5'>
      <Row className='justify-content-center text-center'>
        <h1>Add A New Local Farmer</h1>
      </Row>
      <Row className='justify-content-center'>
        <Col lg={6}>
          <Form>

            <Form.Group className='mt-3'
              onChange={(e) => {
                handleChange(e)
              }}
            >
              <Form.Label>Farmer's Name:</Form.Label>
              <Form.Control 
                type='test' 
                placeholder="Enter Farmer's Name" 
                name='name'
              />
            </Form.Group>

            <Form.Group className='mt-3' onChange={(e) => {
              handleChange(e)
            }}>
              <Form.Label>Farmer's Description</Form.Label>
              <Form.Control 
                as='textarea'
                rows={3}
                placeholder="Enter Farmer's Description"
                name='description'
              />
            </Form.Group>
            
            {showAddContactInfo && <Form.Group className='mt-3' 
                                      onChange={(e) => {
                                        handleChange(e)
                                      }}
                                    >
                                      <Form.Label>Website URL:</Form.Label>
                                      <Form.Control 
                                        type='text'
                                        placeholder='Enter Website URL'
                                        name='websiteURL'
                                      />
                                    </Form.Group>}

            {showAddContactInfo && <Form.Group className='mt-3'>
                                      <Form.Label>Phone Number:</Form.Label>
                                      <Row>
                                        <Col>
                                          <PhoneInput 
                                            placeholder='Enter Phone Number'
                                            country='US'
                                            name='phoneNumber'
                                            onChange={setValue}
                                            value={value}                        
                                          />
                                        </Col>
                                      </Row>
                                    </Form.Group>}


            {showAddContactInfo && <Row className='justify-content-end mt-3'>
                                      <Col xs={2}>
                                        <p
                                          onClick={(e) => {
                                            setShowAddContactInfo(!showAddContactInfo)
                                          }}
                                        >Cancel</p>
                                      </Col>
                                    </Row>}

            {!showAddContactInfo && <Row className='justify-content-end mt-3'>
                                      <Col xs={3}>
                                        <p
                                          onClick={(e) => {
                                            setShowAddContactInfo(!showAddContactInfo)
                                          }}
                                        >+Add Contact Information</p>
                                      </Col>
                                    </Row>}


            <Row className='justify-content-center my-5'>
            <Col className='text-center' sm={6}>
              <Button onClick={(e) => {
                submitNewFarmer(e)
              }}>Submit</Button>
            </Col>
          </Row>


          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateNewFarmer