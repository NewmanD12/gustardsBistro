import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router"
import './AdminPage.css'



const AdminPage = () => {

    const navigate = useNavigate()



    return (
        <Container fluid>
            <Row className='justify-content-center'>
                <Col lg={8} className='text-center'>
                    <button className='buttons' onClick={() => navigate('/create-new-user')}>Add User</button>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={8} className='text-center'>
                    <button className='buttons' onClick={() => navigate('/create-new-menu-item')}>Add Menu Item</button>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={8} className='text-center'>
                    <button className='buttons' onClick={() => navigate('/create-new-farmer')}>Add New Farmer</button>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminPage