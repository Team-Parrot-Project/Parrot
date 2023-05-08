import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { getCurrentUser } from './store/session';
import SignupForm from './components/Splash/SignupForm';
import LoginForm from './components/Login/LoginForm';
import UserHome from './components/UserHome/UserHome';

export default function App() {


  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Switch>

      {/* <Route path={"/login"}>
          <LoginForm />
        </Route>

      <Route path={"/"}>
          <SignupForm />
        </Route> */}

        <AuthRoute exact path="/" component={SignupForm} />
        <AuthRoute exact path="/login" component={LoginForm} />

        <ProtectedRoute exact path="/home" component={UserHome} />

      </Switch>
    </>
  );
}
