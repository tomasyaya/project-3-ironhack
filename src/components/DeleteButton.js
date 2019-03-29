import React, { Component } from 'react';
import guideService from '../service/guideService';

class DeleteButton extends Component {

  handleClick = async (id) => {
    const { refreshGuides } = this.props;
    try{
      await guideService.deleteGuide(id)
      await refreshGuides()  
    } catch(error){
      console.log(error)
    }
  }


  render() {
    const { _id } = this.props;
    
    return (
      <div className="delete-btn">
        <button onClick={() => {this.handleClick(_id)}}>
          X
        </button>
      </div>
    );
  }
}

export default DeleteButton;