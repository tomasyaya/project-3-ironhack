import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Like extends Component {

  state = {
    likes: 0
  }

  componentDidMount() {
    this.searchLikes()
  }

  searchLikes = async () => {
    const { getLikes } = this.props;
    const { id } = this.props.match.params;
    try {
      const { likes } = await getLikes(id)
      this.setState({
        likes: likes.length
      })
    } catch(error) {
      console.log(error)
    }
  }

  handleClick =  async () => {
    const { id } = this.props.match.params;
    const { likes } = this.props;
    try {
      await likes(id)
      this.searchLikes()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { likes } = this.state;
    return (
      <div>
        <h4>{likes}</h4>        
        <button onClick={this.handleClick}>Like</button>      
      </div>
    );
  }
}

export default withRouter(Like);