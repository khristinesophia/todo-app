import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalComponent = ({ showModal,
  handleClose,
  clearAll,
  clearCompleted,
  action 
}) => {
 return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to proceed?</Modal.Body>
      <Modal.Footer>
        <Button className="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="primary" onClick={ action === 'clearAll' ? clearAll : clearCompleted}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
 )
}

export default ModalComponent