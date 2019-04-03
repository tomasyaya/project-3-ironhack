import React, { Component } from 'react';
import guideServices from '../service/guideService';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray, checkUndefined } from '../helpers/conditionals'; 
import CommentForm from '../components/CommentForm';
import CommentCard from '../components/CommentCard';
import guideService from '../service/guideService';
import placeService from '../service/placeService';
import PlaceCard from '../components/PlaceCard';
import { Link } from 'react-router-dom';

class Guide extends Component {

  state = {
    guide: {},
    comments: [],
    isLoaded: false,
    isFavorite: false,
    places: [],
    likesArray: [],
    likes: 0,
    reviews: [0, 0, 0, 0, 0]
  }

  componentDidMount(){
    this.getGuide()
  }

  getGuide = async () => {
    const { id } = this.props.match.params;
    try {
      const guide = await guideServices.getGuide(id);
      const places = await placeService.getPlaces(id)
      const { comments } = guide;
      this.setState({
        guide,
        comments,
        places: [...places],
        isLoaded: true
      })
      this.sumLikes(places)
    } catch(error){
      console.log(error)
    }
  }

  showPlaces = () => {
    const { places } = this.state
    return places.map(place => {
      const { images, location, name, type, description, _id } = place;
      return (
        <PlaceCard
          sumLikes={this.sumLikes} 
          name={name}
          type={type}
          location={location}
          description={description}
          images={images}
          id={_id}
          key={_id}
        />
      )
    })
  }

  sumLikes = (places) => {
   return places.map(place => {
      const { likes } = place;
      return  this.setState({
        likes: this.state.likes + likes.length,
        isLoaded: true,
      })
      
    })
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
    const { _id: guideId } = guide;
    return comments.map(comments => {
      const { _id, name, comment, creator } = comments
      return <CommentCard
                deleteComment={guideService.deleteComment} 
                mainId={guideId}
                commentId={_id}
                name={name}
                comment={comment}
                stateCallback={this.getGuide}
                creator={creator}
                key={_id}
              />
    })
  }

  showAuthorLink = (id) => {
    return <div className="author-link">
      <Link to={`/author/${id}`}>Send message</Link>
    </div>
  }

  render() {
    const { title, location, image } = this.state.guide;
    const { isLoaded, guide, isFavorite, comments, places, likes } = this.state;
    const { id } = this.props.match.params;
    console.log(this.state.places)
    return (
      <div className="guide-detail-main-container">
        <div className="guide-detail-main">
          <h1>Guide</h1>
          <h4>{title}</h4>
          {!checkUndefined(image) ?  <img src={image} alt="pic" />  : <p>{"No picture"}</p>  }
          {isLoaded ? <h4>total likes: {likes}</h4> : null}
          <p>
            Author: {isLoaded ? guide.creator.username : null}
          </p>
            {isLoaded ? this.showAuthorLink(guide.creator._id) : null}
          <p>Address: {location}</p>
          <button onClick={this.handleClick}>
            {isFavorite ? "Already a Fav!" : "Add Fav!"}
          </button>
          <h4>Places</h4>
          <div className="places-wrap-div">
            {isLoaded && !emptyArray(places) ? this.showPlaces() : null}
          </div>
          <div className="comments-container">
            <h4>Comments</h4>
            <div className="show-comments-div">
              {isLoaded && !emptyArray(comments) ? this.displayComments() : null}
            </div>
            <CommentForm 
              id={id}
              getInfo={this.getGuide}
              addComment={guideServices.addComment}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Guide);