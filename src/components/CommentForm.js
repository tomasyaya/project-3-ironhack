import React, { Component } from 'react';
import { checkEmptyFields } from '../helpers/conditionals';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class CommentForm extends Component {

  state = {
    message: '',
    errMessage: "Please write something",
    validation: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      validation: false
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, getInfo, addComment, sendError } = this.props;
    const { push } = this.props.history;
    const { message } = this.state;
    const comment = {
      message
    }
    if(checkEmptyFields(message)){
      this.setState({
        validation: true
      })
      return
    }
    try {
     
      await addComment(id, comment)
      getInfo()
      this.setState({
        message: '',
      })
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  render() {
    const { message, validation, errMessage } = this.state;
    
    return (
      <div className="comments-form">
      {validation ? <p className="error-messge">{errMessage}</p> : null}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="message" placeholder="message" value={ message } onChange={this.handleChange}/>
          <button type="submit">Comment</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { sendError })(CommentForm);