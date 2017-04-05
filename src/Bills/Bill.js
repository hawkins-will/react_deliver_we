import React, { Component } from "react";
import { Link } from "react-router-dom"

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    let total = 0

    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      let personalTotal = 0
      let items = personalOrder.items.map( (item, index) => {
        personalTotal = personalTotal + item.price
        return(
            <p>${item.price.toFixed(2)} {item.name}</p>
        )
      })
      total = total + personalTotal
      return(
        <div>
          <h4>{personalOrder.name}</h4>
          <ul>{items}</ul>
          <p>Personal Total: ${personalTotal.toFixed(2)}</p>
        </div>
      )
    })
    return(
      <div>
        <h2>Bill:</h2>
        {personalOrders}
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    )
  }
}

export default Bill;
