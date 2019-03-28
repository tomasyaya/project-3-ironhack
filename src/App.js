import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import StateProvider from './providers/StateProvider';
import Home from './pages/Home';
import FooterMenu from './components/FooterMenu';
import './App.css';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <StateProvider>
        <div className="container">
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
          <FooterMenu />
        </div>
        </StateProvider>
      </AuthProvider>
    )
  }
}

export default App;
