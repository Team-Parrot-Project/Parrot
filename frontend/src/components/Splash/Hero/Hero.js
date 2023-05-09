import React from 'react';
import SignupForm from "../SignupForm/SignupForm"
import logo from "../../../assets/logo_text_version.png"
import github from "../../../assets/github.png"
import linkedin from "../../../assets/linkedin.png"
import animation from "../../../assets/hero_page_animation.gif"
import './Hero.css';

export default function Hero() {


  return (
    <>
      <div className="hero-page-holder">
        <header className="hero-navbar">
          <div className="logo-container">
            <img className="hero-nav-bar-logo" src={logo} alt="Logo" />
          </div>
          <div className="nav-buttons">
            <button className="login">Login</button>
            <button className="demo-login">Demo User Login</button>
          </div>
        </header>

        <main className="marketing-content">
          <div className="content-container">
            <img className="hero-nav-bar-logo" src={animation} alt="animation" />
            <SignupForm />
          </div>
        </main>



        <footer className="hero-footer">

          <div className="hero-footer-content">
            <div className="hero-footer-team-member">
              <p>Christopher Banas</p>
              <div className="hero-footer-social-links">
                <a href="https://github.com/Team-Parrot-Project/Parrot" className="hero-footer-github-logo">
                  <img src={github} className="hero-footer-github-logo" alt="Github logo" />
                </a>
                <a href="https://www.linkedin.com/in/christopher-banas/" className="hero-footer-linkedin-logo">
                  <img src={linkedin} className="hero-footer-linkedin-logo" alt="LinkedIn logo" />
                </a>
              </div>
            </div>

            <div className="hero-footer-team-member">
              <p>Michael Bird</p>
              <div className="hero-footer-social-links">
                <a href="https://github.com/Team-Parrot-Project/Parrot" className="hero-footer-github-logo">
                  <img src={github} className="hero-footer-github-logo" alt="Github logo" />
                </a>
                <a href="https://www.linkedin.com/in/christopher-banas/" className="hero-footer-linkedin-logo">
                  <img src={linkedin} className="hero-footer-linkedin-logo" alt="LinkedIn logo" />
                </a>
              </div>
            </div>

            <div className="hero-footer-team-member">
              <p>Roderick Mendoza</p>
              <div className="hero-footer-social-links">
                <a href="https://github.com/Team-Parrot-Project/Parrot" className="hero-footer-github-logo">
                  <img src={github} className="hero-footer-github-logo" alt="Github logo" />
                </a>
                <a href="https://www.linkedin.com/in/roderick-mendoza-9133b7b5/" className="hero-footer-linkedin-logo">
                  <img src={linkedin} className="hero-footer-linkedin-logo" alt="LinkedIn logo" />
                </a>
              </div>
            </div>

            <div className="hero-footer-team-member">
              <p>Ryder Aguilera</p>
              <div className="hero-footer-social-links">
                <a href="https://github.com/Team-Parrot-Project/Parrot" className="hero-footer-github-logo">
                  <img src={github} className="hero-footer-github-logo" alt="Github logo" />
                </a>
                <a href="https://www.linkedin.com/in/raguilera994/" className="hero-footer-linkedin-logo">
                  <img src={linkedin} className="hero-footer-linkedin-logo" alt="LinkedIn logo" />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-footer-text">
            <p>© 2023 Parrot, Inc.</p>
          </div>
        </footer>


      </div>
    </>
  )

}
