import React, { Component } from 'react';
import { faIgloo, faArrowLeft, faSignOutAlt, faSquare, faFolderPlus, faStopCircle, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import StateProvider from './providers/StateProvider';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './providers/AuthProvider';
import FooterMenu from './components/FooterMenu';
import AnonRoute from './components/AnonRoute';
import Favorites from './pages/Favorites';
import { Switch } from 'react-router-dom';
import EditGuide from './pages/EditGuide';
import EditPlace from './pages/EditPlace';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';
import MyGuides from './pages/MyGuides';
import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import Splash from './pages/Splash';
import Replay from './pages/Replay';
import Place from './pages/Place';
import Login from './pages/Login';
import Guide from './pages/Guide';
import Home from './pages/Home';
import User from './pages/User';
import store from './store';
import './App.css';

library.add(faIgloo, faArrowLeft, faSignOutAlt, faSquare, faFolderPlus, faStopCircle, faHeart, faEnvelope)

class App extends Component {
  
  render() {

    return (
      <AuthProvider>
        <Provider store={store}>
          <StateProvider>
          <div className="app-container">
            <Navbar />
            <Switch>
              <AnonRoute path="/splash" component={Splash} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/user/guides" component={MyGuides} />
              <PrivateRoute path="/user/guide/:id" component={EditGuide} />
              <PrivateRoute path="/guide/:id" component={Guide} />
              <PrivateRoute path="/places/edit/:id" component={EditPlace} />
              <PrivateRoute path="/place/:id" component={Place} />
              <PrivateRoute path="/author/:id" component={User} />
              <PrivateRoute path="/favorites" component={Favorites} />
              <PrivateRoute path="/error" component={ErrorPage} />
              <PrivateRoute path="/messages" component={Messages} />
              <PrivateRoute path="/:chatid/replay" component={Replay} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
            <FooterMenu />
          </div>
          </StateProvider>
        </Provider>
      </AuthProvider>
    )
  }
}

export default App;
