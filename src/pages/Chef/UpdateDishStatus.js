import React,{useState, useEffect} from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Image,
  Card,
} from "react-bootstrap";
import Switch from '@material-ui/core/Switch';
import { domain } from "../../setting/config";
// npm install react-bootstrap bootstrap
import { qlMonAnService } from "../../services/quanLyMonAnService.js"


// export default function UpdateDishStatus(props) {
//   let { order, selectOrder, orderStt } = props;
// //   const selectOrder = (order) => {
// //     console.log(order)
// // }
//   const [layMonAn, setMonAn] = useState([]);
//   const [curDish, setcurDish] = useState({});
//   const [danhSachMonAn, setDanhSachMonAn] = useState([]);

//   useEffect(() => {
//       //Gọi service Api set lại state danhSachMonAn
//       qlMonAnService.layDanhSachMonAn().then(res => {
//           setDanhSachMonAn(res.data);
//       }).catch(error => {
//           console.log(error.response.data);
//       });
//   }, []);
  
//   function say() {
//     qlMonAnService.capNhatHetMon(curDish.id).then(res => {
//         console.log(res.data);
//         setcurDish(res.data);
//     }).catch(error => {
//         console.log(error.response);
//     });
//     }

//   return (
//         <Container className="my-5">
//           {/* tableDish */}
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>INDEX</th>
//                 <th>IMAGE</th>
//                 <th>NAME</th>
//                 <th>ACTION</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.map((dish) => (
//                 <tr>
//                   <td>{dish.id}</td>
//                   <td>
//                     <Card style={{ width: "10rem", height: "10rem" }}>
//                       <Card.Img variant="top" src={`${domain}/${dish.photo}`} />
//                     </Card>
//                   </td>
//                   <td>{dish.name}</td>
//                   <td>
//                     <Button
//                       className="me-3"
//                       variant="primary"
//                       onClick={say}
//                     >
//                       Cập nhật
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Container>
//   )
// }


export default class MyComponent extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      dishes: [],
      currentDish: {},
      photoUrl: "",
      formData: new FormData(),
    };

  }

  async fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async putData(url = "", formData) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData, // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Cập nhật món ăn thành công!");

    return response2;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.fetchJSON("http://localhost:8080/dish")
        .then((data) => {
          this.setState({
            ...this.state,
            isLoaded: true,
            dishes: data,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            ...this.state,
            isLoaded: true,
            error: e,
            // e,
          });
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { error, isLoaded, dishes } = this.state;

    console.log(dishes);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state);
      console.log("dish id: " + this.state.currentDish.id);
      console.log("formData name: " + this.state.formData.get("name"));
      console.log("formData price: " + this.state.formData.get("price"));
      console.log("formData photo: " + this.state.formData.get("photo"));
      console.log("photoUrl: " + this.state.photoUrl);

      let count = 1;

      return (
        <Container className="my-5">
          {/* tableDish */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>INDEX</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <tr key={dish.id}>
                  <td>{count++}</td>
                  <td>
                    <Card style={{ width: "10rem", height: "10rem" }}>
                      <Card.Img variant="top" src={`${domain}/${dish.photo}`} />
                    </Card>
                  </td>
                  <td>{dish.name}</td>
                  <td > <p class="text-uppercase">{dish.status}</p></td>
                  <td>
                  <Button
											className="me-3"
											variant="primary"
											onClick={() => {
                        qlMonAnService.capNhatHetMon(dish.id).then(res => {
                                   console.log(res.data);
                               }).catch(error => {
                                   console.log(error.response);
                               });
											}
                    }
										>
											 Unavailable
										</Button>	
                    <Button
											className="me-3"
											variant="success"
											onClick={() => {
                        qlMonAnService.capNhatConMon(dish.id).then(res => {
                                   console.log(res.data);
                               }).catch(error => {
                                   console.log(error.response);
                               });
											}
                    }
										>
											Available
										</Button>						
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    }
  }
}
