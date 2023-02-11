import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Event from "./components/Event";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import React, { useState } from "react";
import { auth } from "./firebase";
import EditEvent from "./components/EditEvent/EditEvent";

function App() {
  const [currentUID, setCurrentUID] = useState<string>("");
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setCurrentUID(user.uid);
    } else {
      setCurrentUID("");
    }
  });

  return (
    <Router>
      <div className="App">
        <Nav currentUID={currentUID} />
        <div className="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:eventId" element={<Event currentUID={currentUID} />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/create" element={<EditEvent currentUID={currentUID} />} />
            <Route path="/edit/:eventId" element={<EditEvent currentUID={currentUID} />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
