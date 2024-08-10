import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    const token = response.tokenId;
    
    // Send the token to your backend for verification and email extraction
    fetch('http://localhost:5000/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { email, name } = data;
        if (email.endsWith('@bitsathy.ac.in')) {
          console.log('Login successful:', email, name);
        } else {
          console.error('Invalid email domain');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  const handleError = (error) => {
    console.error('Google login error:', error);
  };

  return (
    <GoogleLogin
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleError}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
