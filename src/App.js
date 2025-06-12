import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"

export default function App(){
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://192.168.88.18:3000/crud')
    // fetch('http://193.186.4.48:3000/crud')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.log(err))
  }, [])

  console.log(items)

  const addItemToState = (item) => {
    setItems(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...items.slice(itemIndex + 1)
    ]
    setItems({ items: newArray })
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems({ items: updatedItems })
  }


  
    return (
      <Container className="App">
         <Row>
          <Col> 
            <h1 style={{margin: "20px 0"}}>CRUD Database</h1>
          </Col> 
         </Row>
        {items && 
        <Row>
          <Col>
           <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
          </Col>
         </Row>        
        }
        
        {items &&
          <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
          </Col>
        </Row> 
        }
        
      </Container>
    )
  }


