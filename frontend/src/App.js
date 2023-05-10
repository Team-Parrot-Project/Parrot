import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { getCurrentUser } from './store/session';
import Splash from './components/Splash/Splash';
import LoginForm from './components/Login/LoginForm';
import UserHome from './components/UserHome/UserHome';
import TestPage from './components/TestComponentsPage/TestIndex';
import ProjectHome from './components/ProjectHome/ProjectHome';

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
          <TaskItem>
          /projects/:projectid component={ProjectHome}
          /projects/:projectid/list <ProjectTaskList> (Table of Tasks)
          /projects/:projectid/timeline <ProjectTimeline> (Gant)
              
              
        </Route> */}

        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute exact path="/login" component={LoginForm} />

        <ProtectedRoute exact path="/home" component={UserHome} />
        <ProtectedRoute exact path="/projects/:projectId" component={ProjectHome} />
        <ProtectedRoute exact path='/test' component={TestPage} />

      </Switch>
    </>
  );
}
