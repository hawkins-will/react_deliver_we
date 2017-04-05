import React, { Component } from "react";
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
  }

  render() {
    let restaurant = this.props.restaurant;
    let menuItems = this.props.restaurant.menuItems.map( (menuItem, index) => {
      return(
        <li key={index}>
        <p>${menuItem.price.toFixed(2)} {menuItem.name}
        <button onClick={() => {
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
        }}>+</button>
        </p>

        <p>{menuItem.description}</p>
        </li>
      )
    })
    return(
      <div>
        <h2>{restaurant.name} Menu:</h2>
          <ul>
            {menuItems}
          </ul>
      </div>
    )
  }
}

export default MenuItemBoxPersonal;
