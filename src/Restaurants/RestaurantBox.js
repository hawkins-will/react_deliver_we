import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

class RestaurantBox extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/restaurants").then((response) => {
      this.setState({
        restaurants: response.data
      })
    })
  }

  render() {
    let restaurants = this.state.restaurants.map( (restaurant, index) => {
      let pathname = `/restaurant/${restaurant.name}`
      return(
        <li key={index}>
          <Link to={{
            pathname,
            state: {active: restaurant }
          }}>
            {restaurant.name}
          </Link>
        </li>
      )
    })
    return(
      <div>
        <h2>Restaurants:</h2>
          <ol>
            {restaurants}
          </ol>
      </div>
    )
  }
}

export default RestaurantBox;
