import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';


class Signup extends Component {

  state = {
    username: "",
    password: "",
    name:"",
    email:"",
    validation: false,

  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, name } = this.state;
    if(!username || !password || !email || !name ) {
      this.setState({
        validation: true
      })
      console.log('inside validation')
      return
    }
    this.props.signup({ username, password , email, name})
      .then(() => {
        this.setState({
            username: "",
            password: "",
            name: "",
            email: "",
        });
      })
      .catch(error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
      validation: false
    });
  }

  render() {
    const { username, password, name, email, validation } = this.state;
    const message = <p id="error-message">Please fill all the categories</p>
    return (
      <div className="signup-main-container">
        <img src="./images/guide2.png"  className="guide-logo" alt="guide-me"/>
        <h2>Guide Me</h2>
        {validation ? message : null}
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