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
      order: order
     }
  }

  handleNewPersonalOrder(newPersonalOrders){
    let order = this.state.order
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newPersonalOrders }).then( res => {
      this.setState( {personalOrders: newPersonalOrders });
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
