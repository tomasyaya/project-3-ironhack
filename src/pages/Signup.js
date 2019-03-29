import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';


class Signup extends Component {

  state = {
    username: "",
    password: "",
    name:"",
    email:""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // const username = this.state.username;
    // const password = this.state.password;
    const { username, password, email, name } = this.state;
   
    this.props.signup({ username, password , email, name})
      .then(() => {
        this.setState({
            username: "",
            password: "",
            name: "",
            email: ""
        });
      })
      .catch(error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, name, email } = this.state;
    return (
      <div className="signup-main-container">
        <img src="./images/guide2.png"  className="guide-logo" alt="guide-me"/>
        <h2>Guide Me</h2>
        <div className="signup-inner-container">
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" name="name" placeholder="name" value={name} onChange={this.handleChange} />
            <input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange}/>
            <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
            <input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange} />
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
          <p>Already have account? 
            <Link to={"/login"} id="login"> Login</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default withAuth(Signup);