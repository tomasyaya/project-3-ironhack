import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import {  checkEmptyFields } from '../helpers/conditionals';

class Login extends Component {
  state = {
    username: "",
    password: "",
    isError: false,
    errorMessage: 'Check credentials or empty fields'
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    if(checkEmptyFields(username, password)){
      this.setState({
        isError: true
      })
    }
    this.props.login({ username, password })
      .then(() => {})
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
      isError: false
    });
  }

  render() {
    const { username, password, isError, errorMessage } = this.state;
    return (
      <div className="login-main">
        <img src="./images/guide2.png"  className="guide-logo" alt="guide-me"/>
        <h2>Guide Me</h2>
        {isError ? <p id="error-message">{errorMessage}</p> : null}
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
          <button className="signup-button ">
            Login
          </button>
          <p>
            Don't have an account?
            <Link to={"/signup"} id="login"> Signup</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default withAuth(Login);
