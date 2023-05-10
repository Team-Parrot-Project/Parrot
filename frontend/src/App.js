import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { getCurrentUser } from './store/session';
import Splash from './components/Splash/Splash';
import LoginForm from './components/Login/LoginForm';
import UserHome from './components/UserHome/UserHome';
import Timeline from './components/Timeline/Timeline';
import TestPage from './components/TestComponentsPage/TestIndex';

export default function App() {


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
        <ProtectedRoute exact path='/timeline' component={Timeline} />
        <ProtectedRoute exact path='/test' component={TestPage} />

      </Switch>
    </>
  );
}
