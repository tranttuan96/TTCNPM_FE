import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./Chefstyle.scss"

export default function Chefpage() {

   function say() {
       alert('Check!');
     }

   return (
       <section className ="container">
           {/* <div className="main"> */}
               <div className="order_list_panel_left">
                   <div className="one_order">
                   <Card>
                   {/* <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header> */}
                   <Card.Body className="card-body d-flex justify-content-between" onClick={say} >
                       <Card.Title >info 1</Card.Title>
                       <Button type="button" variant="success" onClick={say} size="sm" >
                       Confirm
                       </Button>
                   </Card.Body>
                   </Card>
                   </div>

                   <div className="one_order">
                   <Card>
                   {/* <Card.Header class="card-header d-flex justify-content-between ">OrderID</Card.Header> */}
                   <Card.Body className="card-body d-flex justify-content-between " onClick={say} >
                       <Card.Title >info 2</Card.Title>
                       <Button type="button"className="btn btn-success" onClick={say} size="sm" >
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
                       <Button type="button"className="btn btn-success" onClick={say} size="sm" >
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
                   <Button type="button"className="btn btn-secondary" size="sm"  onClick={say}>
                           Cancel
                       </Button>{' '}
                       <Button type="button" className="btn btn-success" size="sm" onClick={say} >
                           Print
                   </Button>{' '}
                       <Button type="button"className="btn btn-success " size="sm"  onClick={say} >
                           Confirm
                   </Button>{' '}
                   </div>
               </div>
           {/* </div>  */}
       </section>
   )
}



// export default function ChefPage() {

//     const [isConfirmed, setConfirmed] = useState(null);

//     useEffect(() => {
//       function handleStatusChange(status) {
//         setConfirmed(status.isConfirmed);
//       }
//     //   ChatAPI.subscribeToOderStatus(props.order.id, handleStatusChange);
//       // Specify how to clean up after this effect:
//       return function cleanup() {
//         // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//       };
//     });
 
//     if (isConfirmed === null) {
//       return 'Loading...';
//     }
//     return isConfirmed ? 'Complete' : 'Waiting';
// }