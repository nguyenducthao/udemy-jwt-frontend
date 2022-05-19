import './App.scss';
import NavHeader from './components/Navigation/NavHeader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/ManageUsers/Users';
import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              height="100"
              width="100"
              color='#1877f2'
              ariaLabel='loading'
            />
            <div>Loading data...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
              {/* {
            account && !_.isEmpty(account) && account.isAuthenticated &&
            <NavHeader />
          } */}
              {/* <Switch>
            <Route path="/news">
              news
            </Route>
            <Route path="/about">
              about
            </Route>
            <Route path="/contact">
              contact
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/" exact>
              home
            </Route>
            <Route path="*">
              404 not found
            </Route>
          </Switch> */}
            </div>
          </>
        }
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
}

export default App;
