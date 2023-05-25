import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { getCurrentUser } from './store/session';
import Splash from './components/Splash/Splash';
import LoginForm from './components/Login/LoginForm';
import UserHome from './components/UserHome/UserHome';
import Timeline from './components/Timeline/Timeline';
import ProjectHome from './components/ProjectHome/ProjectHome';

export default function App() {

  const loggedIn = useSelector(state => !!state.session.user);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Switch>

        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute exact path="/login" component={LoginForm} />

        <ProtectedRoute exact path="/home" component={UserHome} />
        <ProtectedRoute exact path="/projects/:projectId/timeline" component={Timeline} />
        <ProtectedRoute exact path="/projects/:projectId" component={ProjectHome} />

        <Route path="*">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/" />}
        </Route>
        
      </Switch>
    </>
  );
}
