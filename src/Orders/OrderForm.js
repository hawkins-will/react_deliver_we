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
    axios.post("http://localhost:3001/api/orders", { restaurant, restaurantId, deliveryFee, deliveryMin, tax }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    }).then(() => {
      this.props.handleOrderAdded()
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
