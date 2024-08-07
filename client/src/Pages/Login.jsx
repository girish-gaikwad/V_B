import React from "react";
import "../Style/Login.css";

function Login() {
  return (
    <div className="login-body">
      <div className="login">
        <div className="left">
          <img src='https://img.freepik.com/free-vector/book-your-date-mobile-phone_23-2148552969.jpg?w=740&t=st=1723013022~exp=1723013622~hmac=c1689ebfa28884667b03ea86bf7e1db27c81dc026080c215edc6d1c4382c479e' alt="Login" />
          </div>
        <div className="right">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYB-39YIn8M7nenZPpLqrS485KtB_nMVAvgA&s"/>
          <h1>Welcome Back</h1>
          <button type="submit" className="google-button">sign in with google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
