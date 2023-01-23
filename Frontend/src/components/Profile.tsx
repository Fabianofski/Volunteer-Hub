import React from "react";
import "../App.css";
import {useParams} from "react-router-dom";

function Profile() {
  const { uid } = useParams();
  
  return (
    <h1>Profile {uid}</h1>
   
  );
}

export default Profile;
