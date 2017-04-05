import React, { Component } from "react";
import axios from "axios";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.restaurant.name,
      restaurantId: this.props.restaurant._id,
      deliveryFee: this.props.restaurant.deliveryFee,
      deliveryMin: this.props.restaurant.deliveryMin,
      tax: this.props.restaurant.tax
     };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let restaurant = this.state.restaurant.trim();
    let restaurantId = this.state.restaurantId.trim();
    let deliveryFee = this.state.deliveryFee;
    let deliveryMin = this.state.deliveryMin;
    let tax = this.state.tax;
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
