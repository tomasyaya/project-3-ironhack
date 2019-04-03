import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';


class ErrorPage extends Component {

  componentDidMount() {
    this.props.sendError('errorr22222')  
  }
  render() {
    console.log(this.props.error.error)
    return (
      <div>
        <h1>ERROR</h1>
        <h1>ERROR</h1>
        <h1>ERROR</h1>
        <h1>ERROR</h1>
        <h1>ERROR</h1>
        <h1>ERROR</h1>
        <h1>ERROR</h1>
        <h1>{this.props.error.error}</h1>
      </div>
    );
  }
}

const mapStateToPros = state => ({
  error: state.error
})

export default connect(mapStateToPros, { sendError })(ErrorPage);