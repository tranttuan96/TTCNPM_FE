import React from "react";
import { domain } from "../../setting/config";
import { Line } from "react-chartjs-2";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
// npm install react-bootstrap bootstrap
// npm install chart.js
// npm install react-chartjs-2

export default class MyComponent extends React.Component {
  // interval = null;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      data: [65, 59, 80, 81, 56, 55, 40],
      start: "2020-06",
      end: "2021-05",
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
    // this.interval = setInterval(() => {
    this.fetchJSON(`${domain}/revenues`)
      .then((revenues) => {
        let newLabels = [];
        let newData = [];
        revenues.forEach((revenue) => {
          newLabels.push(revenue.createdAt);
          newData.push(parseFloat(revenue.value) / Math.pow(10, 6));
        });
        this.setState({
          ...this.state,
          isLoaded: true,
          labels: newLabels,
          data: newData,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          ...this.state,
          isLoaded: true,
          error: e,
        });
      });
    // }, 2000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  //   this.interval = null;
  // }

  render() {
    const { error, isLoaded, labels, data } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const dataLine = {
        labels: labels,
        datasets: [
          {
            label: "Doanh thu (triệu đồng)",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(225, 204, 230, 0.3)",
            borderColor: "rgb(205, 130, 158)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(205, 130, 158)",
            pointBackgroundColor: "rgba(225, 204, 230, 0.3)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
          },
        ],
      };

      return (
        <Container className="my-5">
          <Row>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const sDate = new Date(
                  parseInt(this.state.start.split("-")[0]),
                  parseInt(this.state.start.split("-")[1]) - 1
                ); // - 1 because month in Date object is index 0-11
                const eDate = new Date(
                  parseInt(this.state.end.split("-")[0]),
                  parseInt(this.state.end.split("-")[1])
                ); // not - 1 because we want to take full last month
                // const sDate = new Date(this.state.start);
                // const eDate = new Date(this.state.end);
                console.log(
                  "start = " +
                    this.state.start +
                    "\n" +
                    "end = " +
                    this.state.end
                );
                console.log(
                  "sDate = " +
                    sDate +
                    " = " +
                    sDate.getTime() +
                    "\n" +
                    "endDate = " +
                    eDate +
                    " = " +
                    eDate.getTime()
                );
                console.log(
                  (eDate.getTime() - sDate.getTime()) / (1000 * 3600 * 24)
                );

                const period =
                  (eDate.getTime() - sDate.getTime()) / (1000 * 3600 * 24); // days
                if (period > 366) {
                  alert("Vui lòng chọn khoảng thời gian trong vòng 1 năm!");
                } else if (period < 28) {
                  alert(
                    "Vui lòng chọn Tháng năm bắt đầu trước Tháng năm kết thúc!"
                  );
                } else {
                  this.fetchJSON(
                    `${domain}/revenues/?start=${this.state.start}&end=${this.state.end}`
                  )
                    .then((revenues) => {
                      let newLabels = [];
                      let newData = [];
                      revenues.forEach((revenue) => {
                        newLabels.push(revenue.createdAt);
                        newData.push(
                          parseFloat(revenue.value) / Math.pow(10, 6)
                        );
                      });
                      this.setState({
                        ...this.state,
                        isLoaded: true,
                        labels: newLabels,
                        data: newData,
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                      this.setState({
                        ...this.state,
                        isLoaded: true,
                        error: e,
                      });
                    });
                }
              }}
            >
              <Row>
                <Col>
                  <Form.Group controlId="start" className="my-3">
                    <Form.Label>Tháng năm bắt đầu:</Form.Label>
                    <Form.Control
                      type="month"
                      name="start"
                      defaultValue="2020-06"
                      onChange={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          start: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="end" className="my-3">
                    <Form.Label>Tháng năm kết thúc</Form.Label>
                    <Form.Control
                      type="month"
                      name="end"
                      defaultValue="2021-05"
                      onChange={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          end: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    className="my-3"
                    size="lg"
                    style={{ width: "100%" }}
                  >
                    Hiển thị
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
          <hr></hr>
          <Row>
            <Line
              data={dataLine}
              options={{
                title: {
                  display: true,
                  text: "Doanh thu theo tháng",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "top",
                },
              }}
            />
          </Row>

          <Row className="mt-5">
            <Col>
							<div style={{ border: "3px solid red", padding: "10px" }}>
								<p>
									Vào ngày cuối mỗi tháng, hệ thống sẽ tự động lấy tất cả đơn hàng trong tháng đó để tính toán doanh thu, lưu trữ lại trong cơ sở dữ liệu và gửi email có chứa hình ảnh biểu đồ doanh thu (12 tháng gần nhất, gồm tháng vừa tính) cho người quản lý.
									<br></br>
									Để demo thì nhóm thiết kế một cái nút "Gửi email" như dưới đây, sau khi bấm nút này thì hệ thống sẽ xem như đã đến cuối tháng và hoạt động như đã mô tả ở trên.
								</p>
								<Button
									variant="outline-warning"
									size="lg"
									style={{width: "100%",}}
									onClick={(e) => {
										e.preventDefault();
										this.fetchJSON(`${domain}/revenues/sendEmail`).catch(
											(e) => {
												console.log(e);
												this.setState({
													...this.state,
													isLoaded: true,
													error: e,
												});
											}
										);

										alert("Đã gửi email!");
									}}
								>
									Gửi email
								</Button>
							</div>
            </Col>
          </Row>

          {/* <Row>
            <Col>
              <Button
                variant="outline-secondary"
								size="lg"
								style={{width: "100%",}}
                onClick={(e) => {
                  e.preventDefault();
                  this.fetchJSON(`${domain}/revenues/auto?status=false`).catch(
                    (e) => {
                      console.log(e);
                      this.setState({
                        ...this.state,
                        isLoaded: true,
                        error: e,
                      });
                    }
                  );

									alert("Stop");
                }}
              >
                Stop
              </Button>
            </Col>
          </Row> */}
        </Container>
      );
    }
  }
}
