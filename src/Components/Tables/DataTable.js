// import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'


export default function DataTable({ items, updateState, deleteItemFromState }){

 const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Hobby</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.first}</td>
              <td>{item.last}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.location}</td>
              <td>{item.hobby}</td>
              <td>
                <div style={{ width: "110px" }}> 
                  <ModalForm buttonLabel="Edit" item={item} updateState={updateState} />
                  <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button> 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
   
    
}
  



