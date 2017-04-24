import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import PersonalOrderForm from "../PersonalOrders/PersonalOrderForm"
import "./PersonalOrderBox.css"

class PersonalOrderBox extends Component {
  constructor(props) {
    super(props);
    let order = this.props.order
    let personalOrders = order.personalOrders
    this.state = {
      personalOrders: personalOrders,
      order: order,
     }
  }

  handleNewPersonalOrder(newPersonalOrders){
    let order = this.state.order
    let restaurant = this.state.order.restaurant;
    let restaurantId = this.state.order.restaurantId;
    let deliveryFee = this.state.order.deliveryFee;
    let deliveryMin = this.state.order.deliveryMin;
    let tax = this.state.order.tax;
    let time = this.state.order.time;
    let logo = this.state.order.logo;
    axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/orders/${order._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { restaurant, restaurantId, deliveryFee, deliveryMin, tax, time, logo, personalOrders: newPersonalOrders }).then( res => {
      this.setState( {personalOrders: newPersonalOrders });
      console.log(newPersonalOrders);
    })
    .catch(err => {
      console.log(err)
    })
  }

  handlePersonalOrderDeleted(){
    this.props.handlePersonalOrderDeleted()
  }

  render() {
    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      let pathname = `/personal_order/${personalOrder.name}`
        return(
          <p key={index}>
            <Link to={{
              pathname,
              state: {
                active: personalOrder,
                order: this.props.order
              },
              props: {handlePersonalOrderDeleted: () => this.handlePersonalOrderDeleted()}
            }}>
              {personalOrder.name}
            </Link>
          </p>
        )
    })
    return(
      <div className="personalOrderBox">
        <h2>People In this Order:</h2>
          <div className="personalOrdersList">
            {personalOrders}
          </div>
          <PersonalOrderForm
            order={this.state.order} handleNewPersonalOrder={(e) => this.handleNewPersonalOrder(e)}
          />
      </div>
    )
  }
}

export default PersonalOrderBox;
