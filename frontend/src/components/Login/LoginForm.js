import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logo from "../../assets/logo_text_version.png";
import github from "../../assets/github.png"
import linkedin from "../../assets/linkedin.png"
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ email: "admin@example.com", password: "password" })
    )
      .then(move => history.push("/home"));
  };

  return (
    <>
      <div className="login-form-wrapper">
        <div className="login-logo-bar">
          <nav className="login-logo-bar-nav">
            <div className="login-logo-container">
              <a href="/">
                <img className="login-logo" src={logo} alt="Parrot logo" />
              </a>
            </div>
          </nav>
        </div>

        <div className="login-form-card-wrapper">

          <h2 className="login-form-card-title"> Welcome to Parrot </h2>
          <span className="login-form-card-sub-title">To get started, please sign in</span>

          <div className="login-form-holder">
            <form className="actual-login-form" onSubmit={handleSubmit}>
              <div className="login-form-label-holder">
                <div className="sub-login-form-label-holder">
                  <div className="login-form-errors">{errors?.email}</div>
                  <label className="login-form-email-label">
                    Email address
                  </label>
                  <input type="email"
                    value={email}
                    onChange={update('email')}
                    placeholder="Email"
                    className="login-form-imput-field"
                    required
                  />
                  <div className="login-form-errors">{errors?.password}</div>
                  <label className="login-form-password-label">
                    Password
                  </label>
                  <input type="password"
                    value={password}
                    onChange={update('password')}
                    placeholder="Password"
                    className="login-form-imput-field"
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <input className="login-form-button" type="submit" value="Log In" disabled={!email || !password} tabIndex="0" />

              <input className="login-form-demo-button" type="submit" value="Demo User Log In" tabIndex="0" onClick={handleDemo} />

            </form>
          </div>
          <div className="login-in-form-signup">
            <span className="login-in-form-signup-text">
              Don't have an
              account?
            </span>
            <a
              href="/"
              className="login-form-redirect-to-signup">
              Sign up
            </a>
          </div>

        </div>

      </div>

    </>
  );
}
