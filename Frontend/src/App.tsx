import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Event from "./components/Event";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import {User} from "./model/User";
import React from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState<User>();
  
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/login" element={<SignIn currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
            <Route path="/signup" element={<SignUp currentUser={currentUser} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
