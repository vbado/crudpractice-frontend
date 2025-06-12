// import React, { Component } from 'react'
import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/AddEditForm'
import { CircleX } from "lucide-react"

export default function ModalForm({buttonLabel, item, updateState, className, addItemToState}) {
    
  const [modalOpen, setModalOpen] = useState(false)
  
  const toggle = () => {
    setModalOpen(!modalOpen)
  }
  
    const closeBtn = <button onClick={toggle}><CircleX/></button>

    let button = ''
    let title = ''

    if(buttonLabel === 'Edit'){
      button = <Button
                color="warning"
                onClick={toggle}
                style={{float: "left", marginRight:"10px"}}>{buttonLabel}
              </Button>
      title = 'Edit Item'
    } else {
      button = <Button
                color="success"
                onClick={toggle}
                style={{float: "left", marginRight:"10px"}}>{buttonLabel}
              </Button>
      title = 'Add New Item'
    }


    return (
    <div>
      {button}
      <Modal isOpen={modalOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={addItemToState}
            updateState={updateState}
            toggle={toggle}
            item={item} />
        </ModalBody>
      </Modal>
    </div>
  )

}

