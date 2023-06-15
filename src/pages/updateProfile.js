import React, { useState, useContext} from "react";
import AuthContext from "../Store/storeContext";
import classes from './updateProfile.module.css';
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
    const navigate = useNavigate()
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [message, setMessage] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfilePictureUrlChange = (event) => {
    setProfilePictureUrl(event.target.value);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const idToken = authCtx.token// get the Firebase Auth ID token for the user
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
    const requestBody = {
      idToken: idToken,
      displayName: name,
      photoUrl: profilePictureUrl,
      deleteAttribute: [], // list of attributes to delete, can be empty
      returnSecureToken: true // whether or not to return an ID and refresh token
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          setMessage("Failed to update profile")
          throw new Error("Failed to update profile");

        }

        return response.json();
      })
      .then((data) => {
        // handle success
        console.log(data)
        setMessage("Profile Updated")
        setTimeout(() => navigate('/welcome'), 2000)

      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <div style={{display: 'flex', justifyContent:'center', marginTop: '10rem'}}>
    <div className={classes.card}>
    <form onSubmit={handleUpdateProfile}>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Name:
        <input type="text" value={name} onChange={handleNameChange} style={{ marginLeft: "1rem" }} />
      </label>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Profile Picture URL:
        <input type="text" value={profilePictureUrl} onChange={handleProfilePictureUrlChange} style={{ marginLeft: "1rem" }} />
      </label>
      <button type="submit" style={{ backgroundColor: "#007aff", color: "#fff", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>Update Profile</button>
      <p>{message}</p>
    </form>
    </div>
    </div>
  );
  }  

export default UpdateProfile;