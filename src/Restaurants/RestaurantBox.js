import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import RestaurantForm from "./RestaurantForm"
import "./RestaurantBox.css"

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

  handleNewRestaurant(newRestaurant){
    axios.post("http://localhost:3001/api/restaurants", newRestaurant).then( res => {
      let restaurants = this.state.restaurants
      let newRestaurants = restaurants.concat([res.data])
      this.setState( {restaurants: newRestaurants });
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleOrderAdded(){
    this.props.handleOrderAdded()
  }

  render() {
    let restaurants = this.state.restaurants.map( (restaurant, index) => {
      let pathname = `/restaurant/${restaurant.name}`
      return(
        <div className="restaurantDiv" key={index}>
          <Link to={{
            pathname,
            state: {active: restaurant },
            props: {handleOrderAdded: () => this.handleOrderAdded()}
          }}>
            <p>{restaurant.name}</p>
          </Link>
          <div className="restaurantInfoContainer">
            <img />
            <div className="restaurantInfo">
              <p className="restaurantInfoTitle">Delivery Fee</p>
              <p>${restaurant.deliveryFee.toFixed(2)}</p>
            </div>
            <div className="restaurantInfo">
              <p className="restaurantInfoTitle">Minimum</p>
              <p>${restaurant.deliveryMin.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div>
        <div>
          {restaurants}
        </div>
        <RestaurantForm
          handleNewRestaurant={(e) => this.handleNewRestaurant(e)}
        />
      </div>
    )
  }
}

export default RestaurantBox;
