import React, { useState } from "react";
import "../App.css";
import {useParams} from "react-router-dom";

function Profile() {
  const { uid } = useParams();
  fetch(`/api/profileInformation?uid=${uid}`)
  .then((response) => response.json())
  .then((data) => console.log(data));

  interface profileData {
    uid: string;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    email: string;
  }

  const [profileData, setProfileData] = useState<profileData>;
  const [email, setEmail] = useState(profileData.email)

  return (
    <div>
    <h1>Profile ID:{uid}<br></br></h1>
    <p>Email adress:  profileData.email</p>
    <p>First name:  </p>
    <p>Last name: </p>
    <p>Telephone: </p>
    <p>Date of Birth: </p>
    </div>
  );
}

export default Profile;
