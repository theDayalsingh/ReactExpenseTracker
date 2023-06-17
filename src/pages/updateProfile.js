import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "../Auth/VerifyEmail";

function UpdateProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [message, setMessage] = useState("");
  const idToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
    const requestBody = { idToken };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user account information");
        }
        return response.json();
      })
      .then((data) => {
        const user = data.users[0];
        setName(user.displayName || "");
        setProfilePictureUrl(user.photoUrl || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idToken]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfilePictureUrlChange = (event) => {
    setProfilePictureUrl(event.target.value);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
    const requestBody = {
      idToken: idToken,
      displayName: name,
      photoUrl: profilePictureUrl,
      deleteAttribute: [],
      returnSecureToken: true,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setMessage("Failed to update profile");
          throw new Error("Failed to update profile");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert(data.displayName);
        setMessage("Profile Updated");
        setTimeout(() => navigate("/welcome"), 2000);
      })
      .catch((error) => {});
  };

  return (
      <div className="p-5 m-5 bg-dark text-center border border-info border-5 rounded-4 text-white">
      <h1 className="text-info">UPDATE PROFILE</h1>
        <form onSubmit={handleUpdateProfile} className="border p-3 border-5 rounded-4">
        <div>
          <input
          className="text-dark px-5 mx-5 py-2 rounded-4 my-3"
          placeholder="Update Your Name Here"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <input
          className="text-dark px-5 mx-5 py-2 rounded-4 my-3"
          placeholder="Profile Picture URL:"
            type="text"
            value={profilePictureUrl}
            onChange={handleProfilePictureUrlChange}
          />
        </div>
          <button className="text-dark bg-info fw-bold px-5 mx-5 py-2 rounded-4 my-3"
            type="submit"
          >
            Update Profile
          </button>
          <p>{message}</p>
        </form>
        <VerifyEmail/>
      </div>
  );
}

export default UpdateProfile;
