import React, { Component } from "react";
import axios from "axios";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant
    this.state = {
      restaurant: restaurant
     };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let restaurant = this.state.restaurant.trim();
    axios.post("http://localhost:3001/api/orders", { restaurant: restaurant }).then( res => {
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
