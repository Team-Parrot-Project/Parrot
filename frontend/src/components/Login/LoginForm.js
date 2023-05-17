import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logo from "../../assets/logo_text_version.png";
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

  const handleDemo2 = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ email: "ryde@or-die.com", password: "password" })
    )
      .then(move => history.push("/home"));
  };

  // Password visible

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
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
                  <div className="password-input-container">
                    <input type={passwordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={update('password')}
                      placeholder="Password"
                      className="login-form-imput-field"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      className="login-password-toggle-button"
                      onClick={handlePasswordToggle}
                      aria-label="Toggle password visibility"
                    >
                      {passwordVisible ?
                        <svg className="login-toogle-password-button-open" width="24" height="24" fill="none" viewBox="0 0 24 24" role="img">
                          <path fill="currentColor" d="M12 9.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM10.75 13a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z" fill-rule="evenodd" clip-rule="evenodd"></path>
                          <path fill="currentColor" fillRule="evenodd" d="M13 4a1 1 0 1 0-2 0v2.543c-1.044.09-1.995.321-2.857.647L6.8 5.4a1 1 0 0 0-1.6 1.2l1.117 1.49a11.766 11.766 0 0 0-2.371 1.941l-.739-.738a1 1 0 0 0-1.414 1.414l.893.893c-.216.318-.4.623-.554.902a1 1 0 0 0-.004.988C3.345 15.714 6.52 19.5 12 19.5c5.473 0 8.647-3.777 9.868-6.002a.99.99 0 0 0 .131-.456.994.994 0 0 0-.127-.532c-.154-.282-.34-.589-.558-.91l.893-.893a1 1 0 0 0-1.414-1.414l-.739.739a11.764 11.764 0 0 0-2.371-1.942L18.8 6.6a1 1 0 1 0-1.6-1.2l-1.343 1.79A10.647 10.647 0 0 0 13 6.543V4Zm-1 13.5c-4.095 0-6.65-2.602-7.841-4.5C5.349 11.103 7.905 8.5 12 8.5c4.095 0 6.65 2.602 7.841 4.5-1.19 1.897-3.746 4.5-7.841 4.5Z" clipRule="evenodd">
                          </path>
                        </svg> :
                        <svg className="login-toogle-password-button-closed" width="24" height="24" fill="none" viewBox="0 0 24 24" role="img">
                          <path fill="currentColor"
                            d="M20.122 9.521C19.085 11.423 16.452 14.5 12 14.5S4.915 11.423 3.878 9.52a1 1 0 0 0-1.756.958c.155.285.343.596.564.92l-.893.894a1 1 0 0 0 1.414 1.414l.739-.739c.65.69 1.44 1.368 2.371 1.942L5.2 16.4a1 1 0 0 0 1.6 1.2l1.343-1.79c.862.326 1.813.556 2.857.647V19a1 1 0 1 0 2 0v-2.543a10.648 10.648 0 0 0 2.857-.647L17.2 17.6a1 1 0 0 0 1.6-1.2l-1.117-1.49a11.77 11.77 0 0 0 2.371-1.942l.739.74a1 1 0 0 0 1.414-1.415l-.893-.893c.22-.325.408-.636.564-.921a1 1 0 0 0-1.756-.958Z">
                          </path>
                        </svg>}
                    </button>
                  </div>
                </div>
              </div>
              <input className="login-form-button" type="submit" value="Log In" disabled={!email || !password} tabIndex="0" />

              <input className="login-form-demo-button" type="submit" value="Demo Log In" tabIndex="0" onClick={handleDemo} />
              
              <input className="login-form-demo-button" type="submit" value="Demo 2 Log In" tabIndex="0" onClick={handleDemo2} />

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
