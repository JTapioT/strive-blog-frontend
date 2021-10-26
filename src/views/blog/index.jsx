import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
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
      let response = await fetch(`${process.env.REACT_APP_BE_PROD_URL}/blogPosts`);

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
                <div>{blog.createdAt.slice(0,10)}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <h3>Comments</h3>
            <div className="d-flex mt-5 justify-content-between">
              {blog.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="d-flex flex-column align-items-baseline p-3"
                  style={{ border: "1px solid black", borderRadius: "20px" }}
                >
                  <h4 className="d-inline">{comment.name}</h4>
                  <p className="p-0">-{comment.message}</p>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.deleteComment({ id: comment.id });
                    }}
                  >
                    Remove comment
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
