import React, { Component } from "react";
import axios from "axios";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant
    this.state = {
      restaurant: restaurant,
      restaurantId: this.props.restaurantId
     };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/restaurants/" + this.props.restaurant).then((response) => {
      this.setState({
        restaurant: response.data.name
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let restaurant = this.state.restaurant.trim();
    let restaurantId = this.props.restaurant.trim();
    axios.post("http://localhost:3001/api/orders", { restaurant: restaurant, restaurantId: restaurantId }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return(
      <button onClick={this.handleSubmit}>
        New Order
      </button>
    )
  }
}

export default OrderForm;
