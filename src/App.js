import logo from "./logo.svg";
import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component.js";
import Home from "./pages/Home/Home.page.js";
import Products from "./pages/Products/Products.page";
import Login from "./pages/Login/Login.page";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}>
          
        </Route>
        <Route path="/products" element={<Products />}>
          
        </Route>
        <Route path="/login" element={<Login />}>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
