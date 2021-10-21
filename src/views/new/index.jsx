import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", category: "", title: "" };
    this.handleChange = this.handleChange.bind(this);
    this.formData = new FormData();
  }

  /* 
  formData.append("coverPhoto", file);
  
  */

  async submitBlogPost(e) {
    e.preventDefault();
    console.log(this.state);

    /* let response = await fetch("http://localhost:3001/blogPosts", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': "application/json"
      }
    }
    ); */

    //

  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form
          className="mt-5"
          onSubmit={(e) => {
            this.submitBlogPost(e);
          }}
        >
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.title}
              onChange={(e) =>
                this.setState({ ...this.state, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.category}
              onChange={(e) =>
                this.setState({ ...this.state, category: e.target.value })
              }
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end align-items-baseline">
            <Form.Group className="d-flex align-items-baseline">
            <Form.Label className="mx-2">Upload an image for blog post</Form.Label>
            <Form.File
              type="file"
              id="blogCoverSubmit"
              onChange={(event) => {
                console.log(event.target.files[0])
                this.formData.append("coverPhoto", event.target.files[0]);
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
