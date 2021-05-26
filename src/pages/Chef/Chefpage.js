import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./Chefstyle.scss"
import { NavLink } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'


export default function Chefpage() {

   // const orderList = (dish) => {
      //  let orderItem = {
           // id: orderItems.order_id,
          //  name:dish.name,
           // price:orderItems.price,
           // quantity:orderItems.quantity,
           // status: orderItems.status,
   //     }
      //  dispatch(showList(orderItem))
  //  }
   // const dispatch = useDispatch();
   // let { order, setOder } = props;

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
                   <div className="title_left_div">Title</div>
                   <div className="one_order">
                   <Card>
                   { <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header>}
                   <Card.Body className=" d-flex justify-content-between" >
                       {/* <Card.Title >info 1</Card.Title> */}
                       {/* <NavLink to="/">{dish.name}</NavLink> */}
                       info 1
                       <Card.Content></Card.Content>
                       <Button type="button" variant="success"  onClick= {handleShow} size="sm" >
                       Confirm
                       </Button>
                   </Card.Body>
                   </Card>
                   </div>

                   <div className="one_order">
                   <Card>
                   { <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header>}
                   <Card.Body className=" d-flex justify-content-between" >
                       {/* <Card.Title >info 1</Card.Title> */}
                       Info o 2
                       <Button type="button" variant="success"  onClick= {handleShow} size="sm" >
                       Confirm
                       </Button>
                   </Card.Body>
                   </Card>
                   </div>

                   <div className="one_order">
                   <Card>
                   { <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header>}
                   <Card.Body className=" d-flex justify-content-between" >
                       {/* <Card.Title >info 1</Card.Title> */}
                       Info o 3
                       <Button type="button" variant="success"  onClick= {handleShow} size="sm" >
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


