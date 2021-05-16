import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { domain } from "../../setting/config";
// npm install react-bootstrap bootstrap

export default class MyComponent extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      showModalAdd: false,
      showModalUpdate: false,
      showModalDelete: false,
      dishes: [],
      dishId: 0,
			currentDish: {},
      photoUrl: "",
      formData: new FormData(),
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  async fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async postData(url = "", formData) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      // "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData, // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Thêm món ăn thành công!");

    return response2;
  }

  async putData(url = "", formData) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      // "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
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

  async deleteData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Xoá món ăn thành công!");

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

  // onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     this.setState({
  //       ...this.state,
  //       form: { ...this.state.form, photo: URL.createObjectURL(img) },
  //     });
  //   }
  // };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let newFormData = this.state.formData;
      newFormData.set("photo", img);
      this.setState({
        ...this.state,
        photoUrl: URL.createObjectURL(img),
        formData: newFormData,
      });
    }
  };

  render() {
    const { error, isLoaded, dishes } = this.state;

    console.log(dishes);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state);
      console.log("dish id: " + this.state.dishId);
      console.log("formData name: " + this.state.formData.get("name"));
      console.log("formData price: " + this.state.formData.get("price"));
      console.log("formData photo: " + this.state.formData.get("photo"));

      let count = 1;

      return (
        <div>
          <h2>Thực đơn</h2>
          <Button
            onClick={() => {
              this.setState({
                ...this.state,
                showModalAdd: true,
                dishId: 0,
              });
            }}
          >
            Thêm món ăn
          </Button>

          {/* modalAdd */}
          <Modal
            show={this.state.showModalAdd}
            onHide={() => this.setState({ ...this.state, showModalAdd: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm món ăn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.postData(
                    "http://localhost:8080/dish",
                    this.state.formData
                  );

                  this.setState({ ...this.state, showModalAdd: false });
                }}
              >
                <Form.Group controlId="dishName" className="my-3">
                  <Form.Label>Tên món ăn</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      let newFormData = this.state.formData;
                      newFormData.set("name", e.target.value);
                      this.setState({
                        ...this.state,
                        formData: newFormData,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="dishPrice" className="my-3">
                  <Form.Label>Giá tiền món ăn</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      let newFormData = this.state.formData;
                      newFormData.set("price", parseInt(e.target.value));
                      this.setState({
                        ...this.state,
                        formData: newFormData,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="dishPhoto" className="my-3">
                  <Form.File id="dishPhotoFile">
                    <Form.File.Label>Hình ảnh món ăn</Form.File.Label>
                    <br></br>
                    <Image
                      src={this.state.photoUrl}
                      style={{ width: "10rem", height: "10rem" }}
                      className="my-3"
                    />
                    <br></br>
                    <Form.File.Input onChange={this.onImageChange} />
                  </Form.File>
                </Form.Group>

                <Button variant="primary" type="submit" className="my-3">
                  Lưu
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  this.setState({ ...this.state, showModalAdd: false })
                }
              >
                Huỷ
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modalUpdate */}
          <Modal
            show={this.state.showModalUpdate}
            onHide={() =>
              this.setState({ ...this.state, showModalUpdate: false })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật món ăn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.putData(
                    "http://localhost:8080/dish/" +
                      this.state.dishId.toString(),
                    this.state.formData
                  );

                  this.setState({ ...this.state, showModalUpdate: false });
                }}
              >
                <Form.Group controlId="dishName2" className="my-3">
                  <Form.Label>Tên món ăn</Form.Label>
                  <Form.Control
                    type="text"
										defaultValue={this.state.currentDish.name}
                    onChange={(e) => {
                      e.preventDefault();
                      let newFormData = this.state.formData;
                      newFormData.set("name", e.target.value);
                      this.setState({
                        ...this.state,
                        formData: newFormData,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="dishPrice2" className="my-3">
                  <Form.Label>Giá tiền món ăn</Form.Label>
                  <Form.Control
                    type="text"
										defaultValue={this.state.currentDish.price}
                    onChange={(e) => {
                      e.preventDefault();
                      let newFormData = this.state.formData;
                      newFormData.set("price", parseInt(e.target.value));
                      this.setState({
                        ...this.state,
                        formData: newFormData,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="dishPhoto2" className="my-3">
                  <Form.File id="dishPhotoFile2">
                    <Form.File.Label>Hình ảnh món ăn</Form.File.Label>
                    <br></br>
                    <Image
                      src={this.state.photoUrl}
                      style={{ width: "10rem", height: "10rem" }}
                      className="my-3"
                    />
                    <br></br>
                    <Form.File.Input onChange={this.onImageChange} />
                  </Form.File>
                </Form.Group>

                <Button variant="primary" type="submit" className="my-3">
                  Lưu
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  this.setState({ ...this.state, showModalUpdate: false })
                }
              >
                Huỷ
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modalDelete */}
          <Modal
            show={this.state.showModalDelete}
            onHide={() =>
              this.setState({ ...this.state, showModalDelete: false })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Xoá món ăn</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xoá món ăn này?</Modal.Body>
            <Modal.Footer>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.deleteData(
                    "http://localhost:8080/dish/" +
                      this.state.dishId.toString()
                  );

                  this.setState({ ...this.state, showModalDelete: false });
                }}
              >
                Chắc chắn
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ ...this.state, showModalDelete: false });
                }}
              >
                Không
              </Button>
            </Modal.Footer>
          </Modal>

          {/* tableDish */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Giá tiền</th>
                <th>Hình ảnh</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <tr key={dish.id}>
                  <td>{count++}</td>
                  <td>{dish.name}</td>
                  <td>{dish.price}</td>
                  <td>
                    <Card style={{ width: "10rem", height: "10rem" }}>
                      <Card.Img variant="top" src={`${domain}/${dish.photo}`} />
                      {/* <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body> */}
                    </Card>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        let newFormData = this.state.formData;
                        newFormData.set("name", e.target.value);
                        this.setState({
                          ...this.state,
                          showModalUpdate: true,
													photoUrl: `${domain}/${dish.photo}`,
                          dishId: parseInt(dish.id),
													currentDish: dish,
                        });
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalDelete: true,
                          dishId: parseInt(dish.id),
                        });
                      }}
                    >
                      Xoá
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}
