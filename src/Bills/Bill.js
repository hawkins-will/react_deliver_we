import React, { Component } from "react";
import { Link } from "react-router-dom"

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    let total = 0.00

    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      console.log(personalOrder.items);
      let items = personalOrder.items.map( (item, index) => {
        return(
          <li>
            <p>${item.price.toFixed(2)} {item.name}</p>
          </li>
        )
      })
      return(
        <div>
          <h4>{personalOrder.name}</h4>
          <ul>{items}</ul>
        </div>
      )
    })
    return(
      <div>
        <h2>Bill:</h2>
          <p>
            {personalOrders}
          </p>
      </div>
    )
  }
}

export default Bill;
