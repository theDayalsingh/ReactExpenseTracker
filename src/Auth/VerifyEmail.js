import { useSelector } from 'react-redux';
import  Button  from 'react-bootstrap/Button';

export default function VerifyEmail() {
  const idToken = useSelector((state) => state.auth.token)

  function verifyEmailHandler() {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3i7KwDYg7UeEtNbcek1azDb6-fUVPZ7s";
    const requestBody = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken,
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
          console.log("Failed to verify email");
          throw new Error("Failed to update profile");
        }
        if(response.ok){
          window.alert('verification mail sent')
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Profile Updated");
      })
      .catch((error) => {
      });
  }
    return (
     
          <div >
            <h4 style={{marginBottom: '1rem'}}>
                Click to verify your email address
              </h4>
              <Button onClick={verifyEmailHandler}>Verify Email</Button>
          </div>
       
    );
}