import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService'
class Private extends Component {


  componentDidMount(){
    guideService.getAll()
    .then(result => console.log(result))
    .catch(error => console.log(error))
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Welcome {user.username}</h1>
      </div>
    )
  }
}

export default withAuth(Private);