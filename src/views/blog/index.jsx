import React, { Component } from "react";
import { Container, Image, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
//import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  };


  async fetchBlogPost() {
    try {
      // Fetch all blog posts:
      let response = await fetch(
        `${process.env.REACT_APP_BE_PROD_URL}/blogPosts`
      );

      if (response.ok) {
        let blogPosts = await response.json();
        // Find blog post by id:
        const { id } = this.props.match.params;
        const blog = blogPosts.find((post) => post._id.toString() === id);
        if (blog) {
          this.setState({ blog, loading: false });
        } else {
          this.props.history.push("/404");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBlogPost() {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_PROD_URL}/blogPosts/${this.state.blog._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Blog post deleted successfully");
        this.props.history.push(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteComment({ id }) {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_PROD_URL}/blogPosts/${this.state.blog._id}/comments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Comment deletion successfull");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postComment(e) {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_PROD_URL}/blogPosts/${this.state.blog._id}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            name: this.state.name,
            message: this.state.commentMsg,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Comment posted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async downloadBlogPDF() {
    this.props.history.push(
      `${process.env.REACT_APP_BE_PROD_URL}/blogPosts/${this.state.blog._id}/downloadPDF`
    );
/*     try {
      let response = await fetch(`${process.env.REACT_APP_BE_PROD_URL}/blogPosts/${this.state.blog._id}/downloadPDF`)
      if(response.ok) {
        console.log("Download successful");
      }
    } catch (error) {
      console.log(error);
    } */
  }

  componentDidMount() {
    this.fetchBlogPost();

    /* const { id } = this.props.match.params;
    console.log(posts);
    const blog = posts.find((post) => post._id.toString() === id);
    if (blog) {
      this.setState({ blog, loading: false });
    } else {
      this.props.history.push("/404");
    } */
  }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt.slice(0, 10)}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit}`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <hr />
            <div>
              <h4 className="text-center">Add a comment</h4>
              <div className="d-flex justify-content-center">
                <Form
                  className="mt-2"
                  style={{ width: "40vw" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.postComment(e);
                  }}
                >
                  <Form.Group controlId="comment-form" className="mt-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="sm"
                      placeholder="Your name"
                      value={this.state.name}
                      onChange={(e) =>
                        this.setState({ ...this.state, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="commentArea">
                    <Form.Label>Add your comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Add your comment here"
                      value={this.state.commentMsg}
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          commentMsg: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Button type="submit" size="lg" variant="outline-dark">
                    Add your comment
                  </Button>
                </Form>
              </div>
            </div>
            <hr />
            <h3>Comments</h3>
            <div className="mt-5">
              {blog.comments.map((comment) => (
                <>
                  <div key={comment.id} className="p-3 mt-2">
                    <h5 className="d-inline">{comment.name}</h5>
                    <p className="p-0" style={{ fontStyle: "italic" }}>
                      {comment.message}
                    </p>
                    <Button
                      variant="outline-dark"
                      onClick={(e) => {
                        e.preventDefault();
                        this.deleteComment({ id: comment.id });
                      }}
                    >
                      Remove comment
                    </Button>
                  </div>
                  <hr />
                </>
              ))}
            </div>
            <Button
              style={{marginRight: "1em"}}
              variant="outline-danger"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                this.deleteBlogPost();
              }}
            >
              DELETE BLOG POST
            </Button>
            <Button
              variant="outline-success"
              size="lg"
              onClick={() => {
                this.downloadBlogPDF();
              }}
            >
              DOWNLOAD BLOG POST
            </Button>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
