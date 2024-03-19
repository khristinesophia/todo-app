import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function DeleteModal ({ showDeleteModal, handleClose, handleDelete }) {
  return (
    <Modal show={showDeleteModal} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>

      <Modal.Footer>
        <Button className="secondary" onClick={handleClose}>Cancel</Button>
        <Button className="primary" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default DeleteModal