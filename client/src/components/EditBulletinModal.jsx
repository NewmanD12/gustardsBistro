import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from './EditBulletinModal.css';

const EditBulletinModal = ({ isEditModalOpen, setIsEditModalOpen, bulletin }) => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const isClosing = useRef(false);
  const bulletinsEndpoint = process.env.REACT_APP_BULLETINS_ENDPOINT;

  // Initialize form fields with bulletin data when modal opens
  useEffect(() => {
    if (isEditModalOpen && bulletin) {
      setHeader(bulletin.bulletinHeader || '');
      setBody(bulletin.bulletinText || '');
      setError(''); // Clear error when modal opens
    }
  }, [isEditModalOpen, bulletin]);

  // Handle modal open/close for body overflow and modal-open class
  useEffect(() => {
    if (isEditModalOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [isEditModalOpen]);

  const handleClear = async () => {
    if (isClosing.current) return;
    isClosing.current = true;
    try {
      const response = await axios.put(`${bulletinsEndpoint}/edit-bulletin/${bulletin._id}`, {
        bulletinHeader: '',
        bulletinText: '',
      });
      console.log('Bulletin updated successfully:', response.data);
      setIsEditModalOpen(false);
      document.body.style.overflow = '';
      isClosing.current = false;
      sessionStorage.clear();
      // Open index page in new tab and attempt to close current tab
      window.open('/', '_blank');
      window.close(); // Fallback: refresh if close doesn't work
      window.location.reload();
    } catch (error) {
      console.error('Error updating bulletin:', error);
      isClosing.current = false;
    }
  };

  const handleSave = async () => {
    if (isClosing.current) return;
    isClosing.current = true;

    // Check if header and body are unchanged
    if (header === (bulletin.bulletinHeader || '') && body === (bulletin.bulletinText || '')) {
      setError('You must make changes or hit cancel');
      isClosing.current = false;
      return;
    }

    try {
      const response = await axios.put(`${bulletinsEndpoint}/edit-bulletin/${bulletin._id}`, {
        bulletinHeader: header,
        bulletinText: body,
      });
      console.log('Bulletin updated successfully:', response.data);
      setIsEditModalOpen(false);
      document.body.style.overflow = '';
      isClosing.current = false;
      sessionStorage.clear();
      // Open index page in new tab and attempt to close current tab
      window.open('/', '_blank');
      window.close(); // Fallback: refresh if close doesn't work
      window.location.reload();
    } catch (error) {
      console.error('Error updating bulletin:', error);
      isClosing.current = false;
    }
  };

  const handleCancel = () => {
    if (isClosing.current) return;
    isClosing.current = true;
    console.log('Cancel clicked');
    setTimeout(() => {
      setIsEditModalOpen(false);
      document.body.style.overflow = '';
      isClosing.current = false;
    }, 100);
  };

  const handleBackdropClick = (event) => {
    if (isClosing.current) return;
    isClosing.current = true;
    console.log('Backdrop click:', event.target, 'Event phase:', event.eventPhase);
    setTimeout(() => {
      setIsEditModalOpen(false);
      document.body.style.overflow = '';
      isClosing.current = false;
    }, 100);
  };

  if (!isEditModalOpen) return null;

  return (

    <>
      <div id="editBulletinContainer" className={`${styles.active} d-flex justify-content-center align-items-center`}>
        <div className={styles.backdrop} onClick={handleBackdropClick}></div>
        <Container fluid className={`${styles.modalContent} bg-white rounded p-4 position-relative`}>
          <Row className="justify-content-center text-center">
            <h1>Edit Bulletin</h1>
          </Row>
          <Row className="justify-content-center">
            <Form>
              <Form.Group className="mb-3" controlId="bulletinHeader">
                <Form.Label>Header</Form.Label>
                <Form.Control
                  type="text"
                  value={header}
                  onChange={(e) => {
                    setHeader(e.target.value);
                    setError(''); // Clear error on input change
                  }}
                  placeholder={bulletin.bulletinHeader ? bulletin.bulletinHeader : "Enter Bulletin Header Here"}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bulletinBody">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    setError(''); // Clear error on input change
                  }}
                  placeholder={bulletin.bulletinText ? bulletin.bulletinText : "Enter Bulletin Body Here"}
                />
              </Form.Group>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button onClick={handleClear}>
                  Delete Current Bulletin
                </Button>
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="danger" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      </div>
    </>
    
  );
};

export default EditBulletinModal;