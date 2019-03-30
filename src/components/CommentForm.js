import React, { Component } from 'react';
import guideService from '../service/guideService';

class CommentForm extends Component {

  state = {
    message: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, getGuide } = this.props;
    const { message } = this.state;
    const comment = {
      message
    }
    try {
      await guideService.addComment(id, comment)
      getGuide()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { message } = this.state;
    
    return (
      <div className="comments-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="message" placeholder="message" value={ message } onChange={this.handleChange}/>
          <button type="submit">Comment</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;