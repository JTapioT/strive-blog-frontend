import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json"; // Fetch instead??
export default class BlogList extends Component {
  state = {
    blogPosts: [],
  };

  async fetchBlogPosts() {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/blogPosts`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      let blogPosts = (await response.json()).results;
      console.log(blogPosts);
      this.setState({
        blogPosts
      })
    }
  }

  componentDidMount() {
    this.fetchBlogPosts();
  }

  render() {
    return (
      <Row>
        {this.state.blogPosts && this.state.blogPosts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
