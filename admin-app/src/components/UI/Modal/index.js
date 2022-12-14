import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modelTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons ? props.buttons.map((btn, index) => 
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ) :
                        <Button variant="primary" className="btn-sm bg-dark" onClick={props.handleSave}>
                            Save
                        </Button>
                }

            </Modal.Footer>
        </Modal>

    )
}

export default NewModal