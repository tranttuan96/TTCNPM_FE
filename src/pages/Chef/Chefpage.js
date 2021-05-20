import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./Chefstyle.scss"
import Modal from 'react-bootstrap/Modal'

export default function Chefpage() {

   function say() {
       alert('Check!');
     }
     
     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
   
    // const [modalShow, setModalShow] = React.useState(false);

   return (
       <section className ="container">
           {/* <div className="main"> */}
               <div className="order_list_panel_left">
                   <div className="one_order">
                   <Card>
                   {/* <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header> */}
                   <Card.Body className=" d-flex justify-content-between" >
                       <Card.Title >info 1</Card.Title>
                       <Button type="button" variant="success"  onClick= {handleShow} size="sm" >
                       Confirm
                       </Button>
                   </Card.Body>
                   </Card>
                   </div>

                   <div className="one_order">
                   <Card>
                   {/* <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header> */}
                   <Card.Body className=" d-flex justify-content-between " >
                       <Card.Title >info 2</Card.Title>
                       <Button type="button"className="btn btn-success" onClick= {handleShow} size="sm" >
                       Confirm
                       </Button>
                   </Card.Body>
                   </Card>
                   </div>

                   <div className="one_order">
                   <Card>
                   {/* <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header> */}
                   <Card.Body className="card-body d-flex justify-content-between " onClick={say} >
                       <Card.Title >info 3</Card.Title>
                       <Button type="button"className="btn btn-success"  onClick={say} size="sm" >
                       Confirm
                       </Button>
                   </Card.Body>
                   </Card>
                   </div>


               </div>
                       {/* RIGHT PANEL */}
               <div className="order_view_panel_right col-md-12" >
                   <div className ="order_view horizontal-center ">This will show order</div>
                   <div className ="btn_div">
                   <Button type="button"className="btn btn-secondary" size="lg"  onClick={say}>
                           Cancel
                       </Button>{' '}
                       <Button type="button" className="btn btn-success" size="lg" onClick={say} >
                           Print
                   </Button>{' '}
                       <Button type="button"className="btn btn-success " size="lg"   onClick={say} >
                           Confirm
                   </Button>{' '}
                   </div>
               </div>
           {/* </div>  */}
           <Modal        
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size="sm"
                >
                <Modal.Body>
                    Are you sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="success">Confirm</Button>
                </Modal.Footer>
                </Modal>
       </section> 

   )
}


