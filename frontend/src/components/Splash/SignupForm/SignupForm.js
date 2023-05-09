import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SignupForm.css';
import { signup, clearSessionErrors } from '../../../store/session';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user));
  }





  // Password visible

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const handlePasswordToggle2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };


  return (
    <form className="hero-page-signup-form" onSubmit={handleSubmit}>
      <h2 className="hero-page-signup-form-text">You’re one click away from less busywork</h2>
      <p className="hero-page-signup-terms">By signing up, I agree to the Parrot Privacy Policy and Terms of Service.</p>
      <div className="signup-form-errors">{errors?.email}</div>
      <label>
        <span></span>
        <input className="signup-form-input" type="email"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          required
        />
      </label>

      <div className="signup-form-errors">{errors?.username}</div>
      <label>
        <span></span>
        <input className="signup-form-input" type="text"
          value={username}
          onChange={update('username')}
          placeholder="Name"
          required
        />
      </label>

      <div className="signup-form-errors">{errors?.password}</div>
      <label>
        <span></span>
        <div className="password-input-container">
          <input
            className="signup-form-input"
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={update('password')}
            placeholder="Password"
            minLength={6}
            required
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={handlePasswordToggle}
            aria-label="Toggle password visibility"
          >
            {passwordVisible ? '👁️' : '👁️'}
          </button>
        </div>
      </label>

      <div className="signup-form-errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        <span></span>
        <div className="password-input-container">
          <input
            className="signup-form-input"
            type={passwordVisible2 ? 'text' : 'password'}
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
            minLength={6}
            required
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={handlePasswordToggle2}
            aria-label="Toggle password visibility"
          >
            {passwordVisible2 ? '👁️' : '👁️'}
          </button>
        </div>
      </label>

      <input
        className="signup-form-button"
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== password2}
      />
    </form>
  );
}
