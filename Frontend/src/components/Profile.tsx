import React, { useState } from "react";
import "../App.css";
import "../Profile.css";
import { useParams } from "react-router-dom";

interface profileData {
  uid: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  tel: string;
  role: string;
}

function Profile() {
  const { uid } = useParams();
  const [profileData, setProfileData] = useState<profileData>();
  fetch(`/api/profileInformation?uid=${uid}`)
    .then((response) => response.json())
    .then((data) => {
      setProfileData(data);
    });

  return (
    <div className="profilePage">
      <div className="backgroundAndPp">
        <div className="titleBackgroundBox">
          <div className="background">
            <img
              className="profilePictureImage"
              src="https://www.gymnasium-hochdahl.de/wp-content/uploads/2022/12/20-12-2022-floorball-4-jpeg.webp"></img>
          </div>
          <div className="profilPicture">
            <img
              className="profilePictureImage"
              src="https://img.freepik.com/fotos-kostenlos/smiley-mann-der-sich-draussen-entspannt_23-2148739334.jpg?w=2000"></img>
          </div>
        </div>
      </div>
      <div className="name">
        <h1 className="left">{profileData?.firstname}</h1>
        <div className="spaceName"></div>
        <h1 className="right"> {profileData?.lastname}</h1>
      </div>
      <div className="aboutmeEvents">
        <div className="aboutme">
          {" "}
          <h3>Über mich:</h3>
          <p>Geburtsdatum: {profileData?.dateOfBirth}</p>
        </div>
        <div className="pastEvents">
          <h3>Hier habe ich teilgenommen:</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
