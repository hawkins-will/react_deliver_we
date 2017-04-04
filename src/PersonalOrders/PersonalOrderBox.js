import React, { Component } from "react";
// import axios from "axios"
import { Link } from "react-router-dom"

class PersonalOrderBox extends Component {
  constructor(props) {
    super(props);
    this.state = { personalOrders: [] };
  }

  render() {
    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      let pathname = `/personal_order/${personalOrder._id}`
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
      </div>
    )
  }
}

export default PersonalOrderBox;
