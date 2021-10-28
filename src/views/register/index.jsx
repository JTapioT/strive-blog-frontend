import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", surname: "", email: "" };
    this.formData = new FormData();
  }

  /* async registerAuthor() {

  } */

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
                  size="lg"
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
                  size="lg"
                  placeholder="Enter your last name"
                  value={this.state.surname}
                  onChange={(e) =>
                    this.setState({ ...this.state, surname: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="register-form" className="mt-3">
            <Form.Label>Your email address</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Enter your email address"
              value={this.state.email}
              onChange={(e) =>
                this.setState({ ...this.state, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end align-items-baseline">
            <Form.Group className="d-flex align-items-baseline">
              <Form.Label className="mx-2">Upload an avatar image</Form.Label>
              <Form.File
                type="file"
                id="authorAvatarImgSubmit"
                onChange={(event) => {
                  //console.log(event.target.files[0])
                  this.formData.append("authorPhoto", event.target.files[0]);
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
