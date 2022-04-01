import { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component.js";
import Home from "./pages/Home/Home.page.js";
import Products from "./pages/Products/Products.page";
import Auth from "./pages/Auth/Auth.page";
import { AuthContext } from "./context/authContext";

function App() {
  const [authenticated, setauthenticated] = useState(false);
  return (
    <>
      <AuthContext.Provider value={{ authenticated, setauthenticated }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
