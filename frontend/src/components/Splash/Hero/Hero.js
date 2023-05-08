import React from 'react';
import SignupForm from "../SignupForm/SignupForm"
import logo from "../../../assets/logo_text_version.png"
import github from "../../../assets/github.png"
import linkedin from "../../../assets/linkedin.png"
import './Hero.css';

export default function Hero() {


  return (
    <>
      <body>
        <header className="navbar">
          <div className="logo-container">
            <img src={logo} alt="Logo"/>
          </div>
          <div className="nav-buttons">
            <button className="login">Login</button>
            <button className="demo-login">Demo User Login</button>
          </div>
        </header>

        <main className="marketing-content">
          <div className="content-container">
            <div className="text-container">
              <h2>You’re one click away</h2>
              <p>from less busywork</p>
            </div>
            <SignupForm/>
          </div>
        </main>

        <footer className="footer">
        © 2023 Parrot, Inc.

        Christopher Banas
        Michael Bird
        Roderick Mendoza
        Ryder Aguilera

        </footer>
      </body>
    </>
  )

}
