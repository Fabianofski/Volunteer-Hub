import React, { useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";

interface profileData {
  uid: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  tel: string;
}

function Profile() {
  const { uid } = useParams();
  const [profileData, setProfileData] = useState<profileData>();
  fetch(`/api/profileInformation?uid=${uid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProfileData(data);
    });

  return (
    <div>
      <h1>
        Profile ID:{uid}
        <br></br>
      </h1>
      <p>Email address: {profileData?.email}</p>
      <p>First name: {profileData?.firstname}</p>
      <p>Last name: {profileData?.lastname}</p>
      <p>Telephone: {profileData?.tel}</p>
      <p>Date of Birth: {profileData?.dateOfBirth}</p>
    </div>
  );
}

export default Profile;
