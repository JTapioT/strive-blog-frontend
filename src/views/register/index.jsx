import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import "./styles.css";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "" };
    //this.formData = new FormData();
  }

  render() {
    return (
      <Container>
        <h1 className="blog-main-title">Register</h1>
        <Form>
          <Form.Group controlId="register-form" className="mt-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.firstName}
              onChange={(e) =>
                this.setState({ ...this.state, firstName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="register-form" className="mt-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.lastName}
              onChange={(e) =>
                this.setState({ ...this.state, lastName: e.target.value })
              }
            />
          </Form.Group>
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
        </Form>
      </Container>
    );
  }
}
