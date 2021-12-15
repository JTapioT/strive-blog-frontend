import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

function Login() {
  const formStyle = {
    width: "50vw",
    color: "#28a745",
    fontWeight: 500,
    border: "1px solid #28a745",
    padding: "1.4rem",
    borderRadius: "20px",
    boxShadow: "none",
  };

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  async function handleLogin(event) {
    try {
      event.preventDefault();
      let response = await fetch(process.env.REACT_APP_BE_URL + "/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(response.ok) {
        const {accessToken} = await response.json()
        localStorage.setItem("token", accessToken);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container style={{ height: "100vh", width: "100vw" }}>
      <Row className="justify-content-center" style={{ marginTop: "40vh" }}>
        <Col xs={12} className="mb-5">
          <h1 className="headerStyle text-center">Welcome, please login.</h1>
        </Col>
        <Form style={formStyle} onClick={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          </Form.Group>
          <Button className="mt-4" variant="outline-success" type="submit">
            Login
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
