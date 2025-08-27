import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useAuth } from '../Hooks/Auth';
import './LocalFarmer.css'
import PhoneInput from 'react-phone-number-input/input'
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

const LocalFarmer = (props) => {
    const { farmer, localFarmersEndpoint } = props
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState()
    const auth = useAuth();

    const CallTo = ({phone, children}) => {
        return <a href={`tel:${phone}`} id='phoneNumber'>{children}</a>;
    }

    const [editedFarmer, setEditedFarmer] = useState({})

    const handleChange = (e) => {
        setEditedFarmer({
            ...editedFarmer,
            [e.target.name] : e.target.value
        })
    }

    const handleDelete = () => {
        axios.delete(`${localFarmersEndpoint}/delete-local-farmer/${farmer._id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => {
                window.location.reload(false)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(farmer.websiteURL ? 'asasd' : 'iididi')
        const editedFarmerToPass = {
            "name" : editedFarmer.name ? editedFarmer.name : farmer.name,
            "description" : editedFarmer.description ? editedFarmer.description : farmer.description,
            "websiteURL" : editedFarmer.websiteURL ? editedFarmer.websiteURL : farmer.websiteURL ? farmer.websiteURL : '',
            "phoneNumber" : value ? value : farmer.phoneNumber ? farmer.phoneNumber : ''
        }
        // console.log(editedFarmerToPass)
        axios.put(`${localFarmersEndpoint}/edit-local-farmer/${farmer._id}`, editedFarmerToPass)
            .then((res) => console.log(res))
            .catch((err) => console.log(err.toString()))
            .finally(() => {
                window.location.reload(false)
            })
    }


    return (
        <div id='individual-farmers'>
            {!isEditing && !auth.userToken && <Container fluid >
                <Row className='justify-content-center text-center'>
                    <Col xs={8}>
                        <h3>{farmer.name}</h3>
                        <p>{farmer.description}</p>
                        {farmer.phoneNumber && farmer.phoneNumber.length > 6 && <p>Phone Number: <CallTo phone={farmer.phoneNumber}>{farmer.phoneNumber}</CallTo></p>}
                        {farmer.websiteURL && farmer.websiteURL.length > 3 && <p>Check Them Out At: <a className='websiteUrls' href={`https://${farmer.websiteURL}`}>{farmer.websiteURL}</a></p>}
                    </Col>
                </Row>
            </Container>}

            {!isEditing && auth.userToken && <Row 
                                                className='justify-content-center text-center'
                                                onMouseLeave={(e) => {
                                                    const buttonRow = document.getElementById(`${farmer._id}-button-row`)
                                                    buttonRow.style.display = 'none'
                                                }} 
                                                onMouseEnter={(e) => {
                                                    const buttonRow = document.getElementById(`${farmer._id}-button-row`)
                                                    buttonRow.style.display = 'flex'
                                                }}
                                            >
                                            <Row style={{display:'none'}} className='justify-content-center text-center my-5' id={`${farmer._id}-button-row`}>
                                                <Col xs={3}>
                                                <Button variant='warning' onClick={() => setIsEditing(true)}>Edit</Button>
                                                </Col>
                                                <Col xs={3}>
                                                <Button variant='danger' onClick={() => handleDelete()}>Delete</Button>
                                                </Col>
                                            </Row>
                    <Col>
                        <h3>{farmer.name}</h3>
                        <p>{farmer.description}</p>
                        {farmer.phoneNumber && <p>Phone Number: <CallTo phone={farmer.phoneNumber}>{farmer.phoneNumber}</CallTo></p>}
                        {farmer.websiteURL && farmer.websiteURL.length > 3 && <p>Check Them Out At: <a className='websiteUrls' href={`https://${farmer.websiteURL}`}>{farmer.websiteURL}</a></p>}
                    </Col>                
                </Row>}

            {isEditing && auth.userToken && <Row
                        className='justify-content-center'
                    >
                    <Col xs={8}>
                        <Row>
                            <Form>
                                <Form.Group onChange={(e) => handleChange(e)}>
                                    <Form.Control 
                                        type='text'
                                        placeholder="Enter A New Name"
                                        name='name'
                                    />
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row className='mt-4'>
                            <Form>
                                <Form.Group onChange={(e) => handleChange(e)}>
                                    <Form.Control 
                                        as='textarea'
                                        rows={3}
                                        name='description'
                                        placeholder='Enter Your New Description'
                                    />
                                </Form.Group>
                            </Form>
                        </Row>

                        {!farmer.websiteURL && <Row className='justify-content-center align-items-center text-start mt-4'>
                            <Col sm={2}>
                                <label className='websiteUrlLabel'>Website URL:</label>
                            </Col>
                            <Col sm={10}>
                                <Form>
                                    <Form.Group onChange={(e) => handleChange(e)}>
                                        <Form.Control 
                                            type='text'
                                            placeholder='Enter A Website URL'
                                            name='websiteURL'
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>}

                        {farmer.websiteURL && <Row className='justify-content-start align-items-center text-start mt-4'>
                            <Col sm={2}>
                                <label className='websiteUrlLabel'>Website URL:</label>
                            </Col>
                            <Col sm={10}>
                                <Form>
                                    <Form.Group onChange={(e) => handleChange(e)}>
                                        <Form.Control 
                                            type='text'
                                            placeholder='Enter A New Website URL'
                                            name='websiteURL'
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>  
                        </Row>}

                        {!farmer.phoneNumber && <Row className='justify-content-center align-items-center text-start mt-4'>
                            <Col sm={2}>
                                <label className='phoneLabel'>Phone Number:</label>
                            </Col>
                            <Col sm={10}>
                                <PhoneInput 
                                    placeholder="Enter Phone Number"
                                    country='US'
                                    name='phoneNumber'
                                    onChange={setValue}
                                    value={value}                       
                                />
                            </Col>
                        </Row>}

                        {farmer.phoneNumber && <Row className='justify-content-center align-items-center text-start mt-4'>
                            <Col sm={2}>
                                <label className='phoneLabel'>Phone Number:</label>
                            </Col>
                            <Col sm={10}>
                                <PhoneInput 
                                    placeholder={farmer.phoneNumber}
                                    country='US'
                                    name='phoneNumber'
                                    onChange={setValue}
                                    value={value}                       
                                />
                            </Col>
                        </Row>}


                        <Row className='justify-content-center text-center'>
                            <Col className='mt-3' sm={6}>
                                <Button variant='success' onClick={(e) => handleSubmit(e)}>Save</Button>
                            </Col>
                            <Col className='mt-3' sm={6}>
                                <Button variant='danger' onClick={() => {
                                    setIsEditing(false)
                                    setEditedFarmer({})
                                }}>Cancel</Button>
                            </Col>
                        </Row>

                        
                    </Col>
                </Row>}
                <ScrollToTopButton />
        </div>
    )
}

export default LocalFarmer