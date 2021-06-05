import React from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Image,
} from "react-bootstrap";
import { domain } from "../../setting/config";
import CurrencyFormat from "react-currency-format";
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

	// function for checking price
	isNumeric(value) {
		return /^\d+$/.test(value);
	}

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.fetchJSON("http://localhost:8080/dish/" + this.props.match.params.tuKhoa)
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
      console.log("dish id: " + this.state.currentDish.id);
      console.log("formData name: " + this.state.formData.get("name"));
      console.log("formData price: " + this.state.formData.get("price"));
      console.log("formData photo: " + this.state.formData.get("photo"));
      console.log("photoUrl: " + this.state.photoUrl);

      let count = 1;

      return (
        <Container className="my-5">
          <Button
            className="mb-3"
            onClick={() => {
              this.setState({
                ...this.state,
                showModalAdd: true,
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
                  let name = this.state.formData.get("name");
									let price = this.state.formData.get("price");
									if (name.length < 5 || name.length > 40) {
										alert("Name must be between 5 and 40 characters!");
									} else if (!this.isNumeric(price) || (price < 1000 || price > 20000000)) {
										alert("Price must be between 1,000 and 20,000,000 dong!");
									} else {
										let newFormData = this.state.formData;
										newFormData.set("price", parseInt(this.state.formData.get("price")));
										this.setState({
											...this.state,
											formData: newFormData,
										});
										this.postData(
											"http://localhost:8080/dish",
											this.state.formData
										);
										this.setState({ ...this.state, showModalAdd: false });
									}
                }}
              >
                <Form.Group controlId="dishName" className="my-3">
                  <Form.Label>Tên món ăn</Form.Label>
                  <Form.Control
                    type="text"
                    required
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
                    type="number"
										step="1000"
                    required
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
                    <Form.File.Input required onChange={this.onImageChange} />
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
                  let name = this.state.formData.get("name");
									let price = this.state.formData.get("price");
									if (name.length < 5 || name.length > 40) {
										alert("Name must be between 5 and 40 characters!");
									} else if (!this.isNumeric(price) || (price < 1000 || price > 20000000)) {
										alert("Price must be between 1,000 and 20,000,000 dong!");
									} else {
										let newFormData = this.state.formData;
										newFormData.set("price", parseInt(this.state.formData.get("price")));
										this.setState({
											...this.state,
											formData: newFormData,
										});
										this.putData(
											"http://localhost:8080/dish/" +
												this.state.currentDish.id.toString(),
											this.state.formData
										);
                  	this.setState({ ...this.state, showModalUpdate: false });
									}
                }}
              >
                <Form.Group controlId="dishName2" className="my-3">
                  <Form.Label>Tên món ăn</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={this.state.currentDish.name}
                    required
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
                    type="number"
										step="1000"
                    defaultValue={this.state.currentDish.price}
                    required
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
                    <Form.File.Input required onChange={this.onImageChange} />
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
                      this.state.currentDish.id.toString()
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
                  <td>
                    <CurrencyFormat
                      value={dish.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </td>
                  <td>
										<div style={{ width: "10rem", height: "10rem" }}>
                      <img src={`${domain}/${dish.photo}`} style={{ width: "10rem", height: "10rem" }} />
                    </div>
                  </td>
                  <td>
                    <Button
                      className="me-3"
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        let newFormData = this.state.formData;
                        newFormData.set("name", dish.name);
                        newFormData.set("price", dish.price);
                        this.setState({
                          ...this.state,
                          showModalUpdate: true,
                          photoUrl: `${domain}/${dish.photo}`,
                          currentDish: dish,
                          formData: newFormData,
                        });
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      className="me-3"
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalDelete: true,
                          currentDish: dish,
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

          <Button
            className="mt-3"
            onClick={() => {
              this.setState({
                ...this.state,
                showModalAdd: true,
              });
            }}
          >
            Thêm món ăn
          </Button>
        </Container>
      );
    }
  }
}
