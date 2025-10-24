import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import './AdminPage.css';
import EditBulletinModal from '../components/EditBulletinModal';

const AdminPage = ( props ) => {

  const { bulletin } = props
  // console.log(bulletin)
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      <Row className='justify-content-center'>
        <Col lg={8} className='text-center'>
          <button className='buttons' onClick={() => setIsEditModalOpen(true)}>Edit Bulletin</button>
        </Col>
      </Row>
      <EditBulletinModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        bulletin={bulletin}
      />
    </Container>
  );
};

export default AdminPage;