import React from 'react';
import ReactDOM from 'react-dom/client';
import './Reset.css'; // always import the reset before the index so that index will override it
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import jwtFetch from './store/jwt';
import { fetchProject } from './store/project';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.jwtFetch = jwtFetch;
<<<<<<< HEAD
  window.fetchProject = fetchProject;
=======
  
>>>>>>> main
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

function Root() {
  return (

      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>

  );
}

function render() {
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
){
  render();
}
