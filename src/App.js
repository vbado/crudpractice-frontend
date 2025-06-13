import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"

export default function App(){
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = () => {
      fetch('http://192.168.88.18:3000/crud')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(err => console.log(err))
    }
  
    fetchData() 
  
    const interval = setInterval(fetchData, 5000) 
  
    return () => clearInterval(interval)
  }, [])

  const addItemToState = (item) => {
    setItems(prevItems => [...prevItems, item])
  }
  
const updateState = (item) => {
  const itemIndex = items.findIndex(data => data.id === item.id)
  const newArray = [
    ...items.slice(0, itemIndex),
    item,
    ...items.slice(itemIndex + 1)
  ]
  setItems(newArray)
}

const deleteItemFromState = (id) => {
  const updatedItems = items.filter(item => item.id !== id)
  setItems(updatedItems)
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


