import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';


class ErrorPage extends Component {

  
  state = {
    isLoaded: false
  }

  componentDidMount() {
     this.setState({
       isLoaded: true
     })
  }
  render() {
    const { error } = this.props.error;
    const { isLoaded } = this.state;
    const errorMessage = JSON.stringify(error)
    return (
      <div className="error-page-main">
        <h1>ERROR</h1>
        <div id="error-page-message">
          <p id="error-p">{isLoaded ? errorMessage : null}</p>
        </div>
      </div>
    );
  }
}

const mapStateToPros = state => ({
  error: state.error
})

export default connect(mapStateToPros, { sendError })(ErrorPage);