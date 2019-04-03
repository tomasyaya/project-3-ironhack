import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class Like extends Component {

  state = {
    likes: 0
  }

  handleClick =  async () => {
    const { id } = this.props.match.params;
    const { likes } = this.props;
    try {
      await likes(id)
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Like</h1>        
        <button onClick={this.handleClick}>Like</button>      
      </div>
    );
  }
}

export default withRouter(Like);