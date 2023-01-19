import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Event from "./components/Event";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
