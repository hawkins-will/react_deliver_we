import React, { Component } from "react";
import marked from "marked";

class Restaurant extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    let {restaurantData} = this.props
    let restaurants = restaurantData.map( (restaurant, index) => {
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
