import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom"
import PersonalOrderBox from "../PersonalOrders/PersonalOrderBox"
import Bill from "../Bills/Bill"

class Order extends Component {
  constructor(props){
    super(props)
    this.state = {
      order: this.props.location.state.active,
      restaurant: undefined
    }
    this.deleteOrder = this.deleteOrder.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  deleteOrder(e) {
    let restaurant = this.state.restaurant
    axios.delete(`http://localhost:3001/api/orders/${this.state.order._id}`, { restaurant: restaurant }).then( res => {
    })
    .catch(err => {
      console.error(err);
    }).then(() => {
      this.props.location.props.handleOrderDeleted()
    })

  }


  render() {
    return(
      <div>
        <p>Order from {this.state.order.restaurant}</p>
        <button onClick={ this.deleteOrder }>Delete</button>
        <PersonalOrderBox
          order={this.state.order}
         />

         <Bill
            order={this.state.order}
         />
      </div>
    )
  }
}

export default Order;
