import React, { Component } from 'react';
import guideServices from '../service/guideService';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray } from '../helpers/conditionals'; 
import CommentForm from '../components/CommentForm';
import CommentCard from '../components/CommentCard';
import { Link } from 'react-router-dom';

class Guide extends Component {

  state = {
    guide: {},
    comments: [],
    isLoaded: false,
    isFavorite: false
  }

  componentDidMount(){
    this.getGuide()
  }

  getGuide = async () => {
    const { id } = this.props.match.params;
    try {
      const guide = await guideServices.getGuide(id);
      const { comments } = guide;
      this.setState({
        guide,
        isLoaded: true,
        comments
      })
    } catch(error){
      console.log(error)
    }
  }

  showPlaces = (places) => {
    return places.map(place => (
      <div className="place-container" key={place._id}>
        <h4>{place.name}</h4>
        <p>{place.what}</p>
        <p>{place.location}</p>
        <p>{place.description}</p>
      </div>
    ))
  }

  handleClick = async () => {
    const { id } = this.props.match.params;
    const { isFavorite } = this.state
    try {
      await guideServices.toggleToFavorites(id);
      this.setState({
        isFavorite: !isFavorite
      })
    } catch(error){
      console.log(error)
    }
  }

  updateComments = () => {
    const { comments } = this.state;
    this.setState({
      comments: [...comments]
    })
  }

  displayComments = () => {
    const { comments, guide } = this.state;
    return comments.map(comment => (
        <CommentCard 
          guide={guide}
          commentId={comment._id}
          name={comment.name}
          comment={comment.comment}
          getGuide={this.getGuide}
          creator={comment.creator}
          key={comment._id}
        />
    ))
  }

  showAuthorLink = (id) => {
    return <div className="author-link">
      <Link to={`/author/${id}`}>Send message</Link>
    </div>
  }

  render() {
    const { title, location } = this.state.guide;
    const { isLoaded, guide, isFavorite, comments } = this.state;
    const { id } = this.props.match.params;

    return (
      <div className="guide-detail-main">
        <h1>Guide</h1>
        <h4>{title}</h4>
        <p>
          Author: {isLoaded ? guide.creator.username : null}
        </p>
          {isLoaded && isFavorite ? this.showAuthorLink(guide.creator._id) : null}
        <p>Address: {location}</p>
        <button onClick={this.handleClick}>
          {isFavorite ? "Already a Fav!" : "Add Fav!"}
        </button>
        <h4>Places</h4>
        <div className="places-wrap-div">
          {isLoaded && !emptyArray(guide.places) ? this.showPlaces(guide.places) : null}
        </div>
        <h4>Comments</h4>
        <div className="show-comments-div">
          {isLoaded && !emptyArray(comments) ? this.displayComments() : null}
        </div>
        <CommentForm 
         id={id}
         getGuide={this.getGuide}
         />
      </div>
    );
  }
}

export default withAuth(Guide);