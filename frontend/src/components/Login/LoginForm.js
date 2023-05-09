import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../../assets/logo_text_version.png"
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="login-form-wrapper">
        <div className="login-logo-bar">
          <nav className="login-logo-bar-nav">
            <a href="/">
              <img class="login-logo" src={logo} alt="Parrot logo"/>
              </a>
          </nav>
        </div>

<div className="login-form-card-wrapper">
<div>

        <form className="session-form" onSubmit={handleSubmit}>
          <h2>Log In Form</h2>
          <div className="errors">{errors?.email}</div>
          <label>
            <span>Email</span>
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <span>Password</span>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <input
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />
        </form>
</div>
</div>

      </div>
    </>
  );
}
