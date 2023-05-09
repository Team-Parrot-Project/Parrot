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
            {passwordVisible ?
              <svg className="toogle-password-button-open" width="24" height="24" fill="none" viewBox="0 0 24 24" role="img">
                <path fill="currentColor" d="M12 9.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM10.75 13a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z" fill-rule="evenodd" clip-rule="evenodd"></path>
                <path fill="currentColor" fillRule="evenodd" d="M13 4a1 1 0 1 0-2 0v2.543c-1.044.09-1.995.321-2.857.647L6.8 5.4a1 1 0 0 0-1.6 1.2l1.117 1.49a11.766 11.766 0 0 0-2.371 1.941l-.739-.738a1 1 0 0 0-1.414 1.414l.893.893c-.216.318-.4.623-.554.902a1 1 0 0 0-.004.988C3.345 15.714 6.52 19.5 12 19.5c5.473 0 8.647-3.777 9.868-6.002a.99.99 0 0 0 .131-.456.994.994 0 0 0-.127-.532c-.154-.282-.34-.589-.558-.91l.893-.893a1 1 0 0 0-1.414-1.414l-.739.739a11.764 11.764 0 0 0-2.371-1.942L18.8 6.6a1 1 0 1 0-1.6-1.2l-1.343 1.79A10.647 10.647 0 0 0 13 6.543V4Zm-1 13.5c-4.095 0-6.65-2.602-7.841-4.5C5.349 11.103 7.905 8.5 12 8.5c4.095 0 6.65 2.602 7.841 4.5-1.19 1.897-3.746 4.5-7.841 4.5Z" clipRule="evenodd">
                </path>
              </svg> :
              <svg className="toogle-password-button-closed" width="24" height="24" fill="none" viewBox="0 0 24 24" role="img">
                <path fill="currentColor"
                  d="M20.122 9.521C19.085 11.423 16.452 14.5 12 14.5S4.915 11.423 3.878 9.52a1 1 0 0 0-1.756.958c.155.285.343.596.564.92l-.893.894a1 1 0 0 0 1.414 1.414l.739-.739c.65.69 1.44 1.368 2.371 1.942L5.2 16.4a1 1 0 0 0 1.6 1.2l1.343-1.79c.862.326 1.813.556 2.857.647V19a1 1 0 1 0 2 0v-2.543a10.648 10.648 0 0 0 2.857-.647L17.2 17.6a1 1 0 0 0 1.6-1.2l-1.117-1.49a11.77 11.77 0 0 0 2.371-1.942l.739.74a1 1 0 0 0 1.414-1.415l-.893-.893c.22-.325.408-.636.564-.921a1 1 0 0 0-1.756-.958Z">
                </path>
              </svg>}
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
            {passwordVisible2 ?
              <svg className="toogle-password-button-open" width="24" height="24" fill="none" viewBox="0 0 24 24" role="img">
                <path fill="currentColor" d="M12 9.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM10.75 13a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z" fill-rule="evenodd" clip-rule="evenodd"></path>
                <path fill="currentColor" fillRule="evenodd" d="M13 4a1 1 0 1 0-2 0v2.543c-1.044.09-1.995.321-2.857.647L6.8 5.4a1 1 0 0 0-1.6 1.2l1.117 1.49a11.766 11.766 0 0 0-2.371 1.941l-.739-.738a1 1 0 0 0-1.414 1.414l.893.893c-.216.318-.4.623-.554.902a1 1 0 0 0-.004.988C3.345 15.714 6.52 19.5 12 19.5c5.473 0 8.647-3.777 9.868-6.002a.99.99 0 0 0 .131-.456.994.994 0 0 0-.127-.532c-.154-.282-.34-.589-.558-.91l.893-.893a1 1 0 0 0-1.414-1.414l-.739.739a11.764 11.764 0 0 0-2.371-1.942L18.8 6.6a1 1 0 1 0-1.6-1.2l-1.343 1.79A10.647 10.647 0 0 0 13 6.543V4Zm-1 13.5c-4.095 0-6.65-2.602-7.841-4.5C5.349 11.103 7.905 8.5 12 8.5c4.095 0 6.65 2.602 7.841 4.5-1.19 1.897-3.746 4.5-7.841 4.5Z" clipRule="evenodd">
                </path>
              </svg> :
              <svg className="toogle-password-button-closed" width="24" height="24" fill="none" viewBox="0 0 24 24" role="img">
                <path fill="currentColor"
                  d="M20.122 9.521C19.085 11.423 16.452 14.5 12 14.5S4.915 11.423 3.878 9.52a1 1 0 0 0-1.756.958c.155.285.343.596.564.92l-.893.894a1 1 0 0 0 1.414 1.414l.739-.739c.65.69 1.44 1.368 2.371 1.942L5.2 16.4a1 1 0 0 0 1.6 1.2l1.343-1.79c.862.326 1.813.556 2.857.647V19a1 1 0 1 0 2 0v-2.543a10.648 10.648 0 0 0 2.857-.647L17.2 17.6a1 1 0 0 0 1.6-1.2l-1.117-1.49a11.77 11.77 0 0 0 2.371-1.942l.739.74a1 1 0 0 0 1.414-1.415l-.893-.893c.22-.325.408-.636.564-.921a1 1 0 0 0-1.756-.958Z">
                </path>
              </svg>}
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
