import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", surname: "", email: "", avatar: "", dateOfBirth: new Date() };
    this.formData = new FormData();
    this.date = new Date();
    this.years = this.getYearsRange();
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  getYearsRange() {
    const yearsArray = [];
    for (let i = 2021; i >= 1940; i--) {
      yearsArray.push(i);
    }
    return yearsArray;
  }

  async registerAuthor() {
    console.log("State before modifying date of birth and avatar url if needed: ", this.state);
    let formattedDob = new Date(this.state.dateOfBirth)
      .toISOString()
      .slice(0, 10);
    console.log(formattedDob);
    let formattedAvatar =
      this.state.avatar ||
      `https://ui-avatars.com/api/?name=${this.state.name}+${this.state.surname}`;
    let body = {...this.state, avatar: formattedAvatar, dateOfBirth: formattedDob};
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/authors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(response.ok && this.formData.get("avatar")) {
      let authorId = (await response.json()).id
      let imgUploadResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/authors/${authorId}/uploadAvatar`, {
          method: "POST",
          body: this.formData
        }
      );

      if(imgUploadResponse.ok) {
        let data = await imgUploadResponse.json();
        console.log(data);
        this.props.history.push("/");
      } else {
        // Add later eg. alert to render etc.
        console.log("Error with avatar image upload");
      }
    } else {
      return;
    }
  }

  render() {
    return (
      <Container>
        <h1 className="blog-main-title">Register</h1>
        <Form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.registerAuthor();
          }}
        >
          <Row>
            <Col>
              <Form.Group controlId="register-form" className="mt-3">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  size="md"
                  placeholder="Enter your first name"
                  value={this.state.name}
                  onChange={(e) =>
                    this.setState({ ...this.state, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="register-form" className="mt-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  size="md"
                  placeholder="Enter your last name"
                  value={this.state.surname}
                  onChange={(e) =>
                    this.setState({ ...this.state, surname: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="register-form" className="mt-3">
                <Form.Label>Your email address</Form.Label>
                <Form.Control
                  size="md"
                  type="email"
                  placeholder="Enter your email address"
                  value={this.state.email}
                  onChange={(e) =>
                    this.setState({ ...this.state, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="register-form" className="mt-3">
                <Form.Label>Avatar image link</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  placeholder="Insert here link to avatar image or leave empty"
                  value={this.state.avatar}
                  onChange={(e) =>
                    this.setState({ ...this.state, avatar: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="dateOfBirth-form" className="mt-3">
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {"<"}
                      </button>
                      <select
                        value={date.getFullYear(date)}
                        onChange={(e) => changeYear(e.target.value)}
                      >
                        {this.years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <select
                        value={this.months[date.getMonth(date)]}
                        onChange={(e) => {
                          e.preventDefault();
                          changeMonth(this.months.indexOf(e.target.value));
                        }}
                      >
                        {this.months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {">"}
                      </button>
                    </div>
                  )}
                  selected={this.state.dateOfBirth}
                  onChange={(date) =>
                    this.setState({ ...this.state, dateOfBirth: date })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="d-flex mt-5 justify-content-end align-items-baseline">
            <Form.Group className="d-flex align-items-baseline">
              <Form.Label className="mx-2">Upload an avatar image</Form.Label>
              <Form.File
                type="file"
                id="authorAvatarImgSubmit"
                onChange={(event) => {
                  //console.log(event.target.files[0])
                  this.formData.append("avatar", event.target.files[0]);
                }}
              />
            </Form.Group>
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
