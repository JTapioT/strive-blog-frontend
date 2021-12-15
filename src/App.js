import React, {useState, useEffect} from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import Register from "./views/register";
import Login from "./views/login";
import { BrowserRouter, Route, useHistory} from "react-router-dom";



function App() {
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/new" exact component={NewBlogPost} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
