import React, { Component } from "react";
import Restaurant from "./Restaurant";

class RestaurantBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    let restaurants = [
      { name: "McDonalds"},
      { name: "Burger King"}
    ]
    return(
      <div>
        <h2>Restaurants:</h2>
        <Restaurant
          restaurantData={restaurants}
        />
      </div>
    )
  }
}

export default RestaurantBox;
