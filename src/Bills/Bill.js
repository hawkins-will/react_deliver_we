import React, { Component } from "react";
import { Link } from "react-router-dom"

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    let total = 0
    let personalTip = 5/this.props.order.personalOrders.length
    let personalFee = this.props.order.deliveryFee/this.props.order.personalOrders.length
    console.log(personalFee);
    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      let personalTotal = 0
      let items = personalOrder.items.map( (item, index) => {
        personalTotal = personalTotal + item.price
        return(
            <p>${item.price.toFixed(2)} {item.name}</p>
        )
      })
      personalTotal = personalTotal + personalFee
      let personalTax = personalTotal*(this.props.order.tax/100)
      personalTotal = personalTotal + personalTax + personalTip
      total = total + personalTotal
      return(
        <div>
          <h4>{personalOrder.name}</h4>
          <ul>
            {items}
            <ul>
              ${personalFee.toFixed(2)} Personal Fee
              <br />
              ${personalTax.toFixed(2)} Tax
              <br />
              ${personalTip.toFixed(2)} Personal Tip
            </ul>
          </ul>
          <p>Personal Total: ${personalTotal.toFixed(2)}</p>
        </div>
      )
    })
    return(
      <div>
        <h2>Bill:</h2>
        {personalOrders}
        **********
        <p>Total pre-Tip: ${(total - 5).toFixed(2)}</p>
        <p>Total with Tip: ${total.toFixed(2)}</p>
      </div>
    )
  }
}

export default Bill;
