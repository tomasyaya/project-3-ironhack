import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import GuideList from '../components/GuidesList';
import { withAuth } from '../providers/AuthProvider';
import FileUpload from '../components/FileUpload';

class Home extends Component {
  render() {
    return (
      <div className="home-main-div">
        <div className="home-inner-div">
          <h1>Where to?</h1>
          <GuideList />
          <FileUpload />
        </div>
      </div>
    );
  }
}

export default withAuth(Home);