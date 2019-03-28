import React, { Component } from 'react';
import StateProvider from './providers/StateProvider';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './providers/AuthProvider';
import FooterMenu from './components/FooterMenu';
import AnonRoute from './components/AnonRoute';
import Favorites from './pages/Favorites';
import { Switch } from 'react-router-dom';
import EditGuide from './pages/EditGuide';
import Navbar from './components/Navbar';
import MyGuides from './pages/MyGuides';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Guide from './pages/Guide';
import Home from './pages/Home';
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
            <PrivateRoute path="/user/guides" component={MyGuides} />
            <PrivateRoute path="/user/guide/:id" component={EditGuide} />
            <PrivateRoute path="/guide/:id" component={Guide} />
            <PrivateRoute path="/favorites" component={Favorites} />
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
