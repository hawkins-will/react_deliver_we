import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import PersonalOrderForm from "../PersonalOrders/PersonalOrderForm"
import PersonalOrderBox from "../PersonalOrders/PersonalOrderBox"
import Bill from "../Bills/Bill"

class Order extends Component {
  constructor(props){
    super(props)
    this.state = {
      order: this.props.location.state.active,
      restaurant: undefined
    }
    this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  handleRestaurantChange(e) {
    this.setState( { restaurant: e.target.value });
  }

  updateOrder(e) {
    e.preventDefault();
    let restaurant = this.state.restaurant.trim();
    axios.put(`http://localhost:3001/api/orders/${this.state.order._id}`, { restaurant: restaurant }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ restaurant: undefined })
    })
  }

  deleteOrder(e) {
    let restaurant = this.state.restaurant
    axios.delete(`http://localhost:3001/api/orders/${this.state.order._id}`, { restaurant: restaurant }).then( res => {
      console.log("Order Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div>
        <p>Order from {this.state.order.restaurant}</p>

        <form onSubmit={ this.updateOrder }>
          <input type="text" placeholder={ this.state.order.restaurant } onChange={ this.handleRestaurantChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deleteOrder }>Delete</button>
        <PersonalOrderBox
          order={this.state.order}
         />

         <Bill
            order={this.state.order}
         />

        <PersonalOrderForm
          order={this.state.order}
        />
      </div>
    )
  }
}

export default Order;
