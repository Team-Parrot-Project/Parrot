import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import logo from "../../assets/logo_text_version.png"
import './NavBar.css';
import Notifications from "../Notifications/Notifications";
import { useState } from 'react';
import { getTimelineSvg } from "../../store/util";

export default function NavBar({ timelineLogOut }) {

  const [toggleNav, setToggleNav] = useState(false);

  const { projectId } = useParams()
  const dispatch = useDispatch();
  const location = useLocation();
  const userName = useSelector(state => state.session.user.username);

  const hanldeLogout = timelineLogOut || ((e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
  });

  const isProjectTimelinePage = location.pathname === `/projects/${projectId}/timeline`;

  const handleToggle = (e) => {
    e.preventDefault();
    if (toggleNav) {
      setToggleNav(false)
    } else {
      setToggleNav(true)
    }
  }

  return (
    <>
      <nav className='side-nav'>
        <div className="side-nav-main-content">
          <div className="nav-company-logo-container">
            <img src={logo} alt="company logo"></img>
          </div>
          <div className="bottom-left-nav">

            <div className="user-initial-circle">{userName[0]}</div>
            <button className="nav-bar-logout-button" onClick={hanldeLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" /></svg>
            </button>
          </div>

          <ul className="nav-list">
            <li className="nav-list-item">
              <Link to="/home" className="nav-link">
                <svg className="nav-icon" viewBox="0 0 40 40">
                  <path d="M37.9,15L22.2,3.8c-1.3-1-3.1-1-4.4-0.1L2.2,14.4c-0.7,0.5-0.9,1.4-0.4,2.1c0.5,0.7,1.4,0.9,2.1,0.4L6,15.4v12.3c0,4.6,3.7,8.3,8.3,8.3h11.4c4.6,0,8.3-3.7,8.3-8.3V15.9l2.1,1.5c0.3,0.2,0.6,0.3,0.9,0.3c0.5,0,0.9-0.2,1.2-0.6C38.7,16.4,38.5,15.5,37.9,15z M31,27.7c0,2.9-2.4,5.3-5.3,5.3H14.3C11.4,33,9,30.6,9,27.7V13.3l10.6-7.2c0.2-0.2,0.5-0.2,0.8,0L31,13.7V27.7z">
                  </path>
                </svg>
                <span className="nav-text">Home</span>
              </Link>
            </li>

            {projectId &&
              <li className="nav-list-item">
                <Link to={`/projects/${projectId}/timeline`} className="nav-link">
                  {getTimelineSvg()}
                  <span className="nav-text">Timeline</span>
                </Link>
              </li>
            }


            {isProjectTimelinePage && (
              <li className="nav-list-item">
                <Link to={`/projects/${projectId}`} className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 40 40">
                    <path d="M30.5,9h-7.8l-3.6-3.6C18.2,4.5,16.9,4,15.6,4h-5.1C6.9,4,4,6.9,4,10.5v19c0,3.6,2.9,6.5,6.5,6.5h19c3.6,0,6.5-2.9,6.5-6.5v-15C36,11.5,33.5,9,30.5,9z M33,29.5c0,1.9-1.6,3.5-3.5,3.5h-19C8.6,33,7,31.4,7,29.5v-19C7,8.6,8.6,7,10.5,7h5.1c0.5,0,1,0.2,1.4,0.6l4.1,4c0.3,0.3,0.7,0.4,1.1,0.4h8.4c1.4,0,2.5,1.1,2.5,2.5L33,29.5L33,29.5z M13.5,13L13.5,13c0.8,0,1.5,0.7,1.5,1.5v13c0,0.8-0.7,1.5-1.5,1.5l0,0c-0.8,0-1.5-0.7-1.5-1.5v-13C12,13.7,12.7,13,13.5,13z M25.5,18L25.5,18c0.8,0,1.5,0.7,1.5,1.5v8c0,0.8-0.7,1.5-1.5,1.5l0,0c-0.8,0-1.5-0.7-1.5-1.5v-8C24,18.7,24.7,18,25.5,18z M19.5,22L19.5,22c0.8,0,1.5,0.7,1.5,1.5v4c0,0.8-0.7,1.5-1.5,1.5l0,0c-0.8,0-1.5-0.7-1.5-1.5v-4C18,22.7,18.7,22,19.5,22z">
                    </path>
                  </svg>
                  <span className="nav-text">My Project</span>
                </Link>
              </li>
            )}


          </ul>
          <hr className="nav-custom-hr" />
          <section className="notifications">
            <Notifications />
          </section>
        </div>
      </nav>

    </>
  );
}
