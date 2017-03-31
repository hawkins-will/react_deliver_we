import React, { Component } from "react";
import Restaurant from "./Restaurant";
import axios from "axios"

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
    return(
      <div>
        <h2>Restaurants:</h2>
        <Restaurant
          restaurants={this.state.restaurants}
        />
      </div>
    )
  }
}

export default RestaurantBox;
