import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

class MenuItemBox extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant;
    this.state = { restaurant: restaurant };
    console.log(restaurant);
  }

  render() {
    let restaurant = this.props.restaurant;
    let menuItems = this.props.restaurant.menuItems.map( (menuItem, index) => {
      let pathname = `/menu_item/${menuItem._id}`
        return(
          <li key={index}>
          ${menuItem.price}
            <Link to={{
              pathname,
              state: {
                active: menuItem,
                restaurant: this.props.restaurant
               }
            }}>
              {menuItem.name}
            </Link>
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

export default MenuItemBox;
