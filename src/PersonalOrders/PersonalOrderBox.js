import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import PersonalOrderForm from "../PersonalOrders/PersonalOrderForm"

class PersonalOrderBox extends Component {
  constructor(props) {
    super(props);
    let order = this.props.order
    let personalOrders = order.personalOrders
    this.state = {
      personalOrders: personalOrders,
      order: order
     };
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

  render() {
    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      let pathname = `/personal_order/${personalOrder.name}`
        return(
          <li key={index}>
            <Link to={{
              pathname,
              state: {
                active: personalOrder,
                order: this.props.order
               }
            }}>
              {personalOrder.name}
            </Link>
          </li>
        )
    })
    return(
      <div>
        <h2>PersonalOrders:</h2>
          <ol>
            {personalOrders}
          </ol>

          <PersonalOrderForm
            order={this.state.order} handleNewPersonalOrder={(e) => this.handleNewPersonalOrder(e)}
          />
      </div>
    )
  }
}

export default PersonalOrderBox;
