import React, { useEffect, useRef } from 'react';
import styles from './BulletinModal.css';

const BulletinModal = ({ bulletin, isModalOpen, setIsModalOpen, onModalStateChange }) => {
  // Destructure bulletin props with fallback
  const header = bulletin?.bulletinHeader || 'Default Header';
  const body = bulletin?.bulletinText || 'Default Body';
  const isClosing = useRef(false); // Prevent re-rendering during close
  const closeIntent = useRef(false); // Track closure intent

  useEffect(() => {
    // Skip if closing or close intent is set
    if (isClosing.current || closeIntent.current) return;

    // Check if bulletin has content
    const hasContent = bulletin?.bulletinHeader?.trim() || bulletin?.bulletinText?.trim();

    // Initialize modal state based on sessionStorage and content
    const modalShown = sessionStorage.getItem('modalShown');
    const modalClosed = sessionStorage.getItem('modalClosed');
    if (!modalShown && !modalClosed && !isModalOpen && hasContent) {
      // console.log('Opening modal: sessionStorage modalShown and modalClosed not set, bulletin has content');
      setIsModalOpen(true);
      sessionStorage.setItem('modalShown', 'true');
    } else {
      // console.log('Modal not opened:', { modalShown, modalClosed, isModalOpen, hasContent });
    }

    // Set body classes for modal and disable scrolling
    if (isModalOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }

    // Notify parent of modal state changes
    if (onModalStateChange) {
      onModalStateChange(isModalOpen);
    }

    // Debugging: Log sessionStorage, props, and content check
    // console.log('Current sessionStorage:', sessionStorage);
    // console.log('BulletinModal props:', { bulletin, isModalOpen, onModalStateChange });
    // console.log('Bulletin has content:', hasContent);

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [isModalOpen, setIsModalOpen, onModalStateChange, bulletin]);

  useEffect(() => {
    if (!isModalOpen || isClosing.current || closeIntent.current) return;

    const handleCloseModal = (event) => {
      if (isClosing.current || closeIntent.current) return;
      isClosing.current = true;
      closeIntent.current = true;
      // console.log('Document click triggered:', event.target, 'Event phase:', event.eventPhase);
      setTimeout(() => {
        setIsModalOpen((prev) => {
          // console.log('Closing modal from document, prev state:', prev);
          return false;
        });
        sessionStorage.setItem('modalClosed', 'true');
        document.body.style.overflow = '';
        isClosing.current = false;
      }, 100);
    };

    // Add click listener to document in capture phase
    document.addEventListener('click', handleCloseModal, { capture: true });

    // Cleanup listener when modal closes or unmounts
    return () => {
      document.removeEventListener('click', handleCloseModal, { capture: true });
      // console.log('Document click listener removed');
      document.body.style.overflow = '';
    };
  }, [isModalOpen, setIsModalOpen]);

  // Click handler for backdrop
  const handleBackdropClick = (event) => {
    if (isClosing.current || closeIntent.current) return;
    isClosing.current = true;
    closeIntent.current = true;
    // console.log('Backdrop click:', event.target, 'Event phase:', event.eventPhase);
    setTimeout(() => {
      setIsModalOpen((prev) => {
        // console.log('Closing modal from backdrop, prev state:', prev);
        return false;
      });
      sessionStorage.setItem('modalClosed', 'true');
      document.body.style.overflow = '';
      isClosing.current = false;
    }, 100);
  };

  // Click handler for close button
  const handleCloseButtonClick = () => {
    if (isClosing.current || closeIntent.current) return;
    isClosing.current = true;
    closeIntent.current = true;
    // console.log('Close button clicked');
    setTimeout(() => {
      setIsModalOpen((prev) => {
        // console.log('Closing modal from button, prev state:', prev);
        return false;
      });
      sessionStorage.setItem('modalClosed', 'true');
      document.body.style.overflow = '';
      isClosing.current = false;
    }, 100);
  };

  // Don't render if modal is not open
  if (!isModalOpen) return null;

  return (
    <div id="modelContainer" className={isModalOpen ? styles.active : ''}>
      <div className={styles.backdrop} onClick={handleBackdropClick}></div>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleCloseButtonClick}
        id='modalCloseButton'>
          &times;
        </button>
        <h2>{header}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default BulletinModal;