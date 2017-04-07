import React, { Component } from "react";
import "./MenuItemBoxPersonal.css"
// import axios from "axios"
// import { Link } from "react-router-dom"

class MenuItemBoxPersonal extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant;
    let order = this.props.order;
    let personalOrder = this.props.personalOrder;
    this.state = {
      restaurant: restaurant,
      order: order,
      personalOrder: personalOrder
    }
    console.log(this.props);
  }

  render() {
    let restaurant = this.props.restaurant;
    let menuItems = this.props.restaurant.menuItems.map( (menuItem, index) => {
      return(
        <div className="personalMenuItemDiv" key={index} onClick={() => {
          let order = this.props.order;
          let personalOrder = this.props.personalOrder;
          let personalId = this.props.personalOrder._id;
          let newArray = order.personalOrders.filter((personalOrder) => {
            return personalOrder._id !== personalId
          })
          let name = menuItem.name
          let price = menuItem.price
          let description = menuItem.description
          personalOrder.items.push( {name: name, price: price, description: description })
          newArray.unshift(personalOrder);
          this.props.handleNewItem(newArray)
        }}>
          <p className="personalMenuItemHeader"><span className="personalMenuItemName">{menuItem.name}</span> ${menuItem.price.toFixed(2)}</p>
          <p className="personalMenuDescription">{menuItem.description}</p>
        </div>
      )
    })
    return(
      <div className="menuItemBoxPersonal">
        <h2>{restaurant.name} Menu</h2>
        <div className="personalOrderMenu">
          {menuItems}
        </div>
      </div>
    )
  }
}

export default MenuItemBoxPersonal;
