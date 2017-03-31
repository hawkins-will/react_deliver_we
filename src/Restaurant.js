import React, { Component } from "react";
import marked from "marked";

class Restaurant extends Component {
  constructor(props){
    super(props)
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    let restaurants = this.props.restaurants.map( (restaurant, index) => {
      return(
        <div key={index}>
          <li>{restaurant.name}</li>
        </div>
      )
    })
    return(
      <div>
        <ol>{restaurants}</ol>
      </div>
    )
  }
}

export default Restaurant;
