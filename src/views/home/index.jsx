import React, { Component } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list";
import "./styles.css";
import {useParams} from "react";

export default function Home() {
  // TODO:
  // Implement somehow the user logged in or not behavior so it will direct to login if localStorage do not contain token(?) 

  return (
      <Container fluid="sm">
        <h1 className="blog-main-title">Welcome to the Strive Blog!</h1>
        <BlogList />
      </Container>
    );
}

