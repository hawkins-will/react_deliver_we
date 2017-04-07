import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./Bill.css"

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    let total = 0
    let personalTip = 5/this.props.order.personalOrders.length
    let personalFee = this.props.order.deliveryFee/this.props.order.personalOrders.length
    let personalOrders = this.props.order.personalOrders.map( (personalOrder, index) => {
      let personalTotal = 0
      let items = personalOrder.items.map( (item, index) => {
        personalTotal = personalTotal + item.price
        return(
            <p className="billItem">{item.name} <span>{item.price.toFixed(2)}</span></p>
        )
      })
      personalTotal = personalTotal + personalFee
      let personalTax = personalTotal*(this.props.order.tax/100)
      personalTotal = personalTotal + personalTax + personalTip
      total = total + personalTotal
      return(
        <div>
          <h4>{personalOrder.name.toUpperCase()}</h4>
          <div className="billPersonalSection">
            {items}
            <div className="billPersonalFees">
              <p className="billItem">Personal Fee <span>{personalFee.toFixed(2)}</span></p>
              <p className="billItem">Tax <span>{personalTax.toFixed(2)}</span></p>
              <p className="billItem">Personal Tip <span>{personalTip.toFixed(2)}</span></p>
            </div>
            <p className="billPersonalTotal billItem">Personal Total <span>${personalTotal.toFixed(2)}</span></p>
          </div>
          <hr className="billPersonalSectionEnd" />
        </div>
      )
    })
    return(
      <div className="bill">
        <h2>Bill</h2>
        <hr />
        {personalOrders}
        <div className="billTotals">
          <p className="billItem billPreTip">Total <span>${(total - 5).toFixed(2)}</span></p>
          <p className="billItem">Total with Tip <span>${total.toFixed(2)}</span></p>
        </div>
      </div>
    )
  }
}

export default Bill;
