import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom"
import PersonalOrderBox from "../PersonalOrders/PersonalOrderBox"
import Bill from "../Bills/Bill"
import "./Order.css"

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

  handlePersonalOrderDeleted(){
    this.props.location.props.handlePersonalOrderDeleted()
  }

  render() {
    return(
      <div className="orderPage">
        <div className="orderLeft">
          <p className="orderTitle">Order from "{this.state.order.restaurant}" <span className="cancelOrder" onClick={ this.deleteOrder }> cancel</span></p>
          <PersonalOrderBox
            order={this.state.order} handlePersonalOrderDeleted={() => this.handlePersonalOrderDeleted()}
          />
        </div>
        <div className="orderRight">
          <Bill
            order={this.state.order}
          />
        </div>
      </div>
    )
  }
}

export default Order;
