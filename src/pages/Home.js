import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import GuideList from '../components/GuidesList';

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

export default Home;