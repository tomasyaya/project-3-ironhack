import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import GuideList from '../components/GuidesList';
import { withAuth } from '../providers/AuthProvider';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <GuideList />
      </div>
    );
  }
}

export default withAuth(Home);