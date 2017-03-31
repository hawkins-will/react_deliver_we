import React, { Component } from "react";
import marked from "marked";

class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant: this.props.location.state.active,
    }
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return(
      <div>
        <p>{this.state.restaurant.name} Page</p>
      </div>
    )
  }
}

export default Restaurant;
