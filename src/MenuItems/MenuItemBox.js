import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import MenuItemForm from "../MenuItems/MenuItemForm"

class MenuItemBox extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant;
    this.state = {
      restaurant: restaurant,
      menuItems: restaurant.menuItems
     };
  }

  handleNewMenuItem(newMenuItems){
    let restaurant = this.state.restaurant
    console.log(newMenuItems);
    axios.put(`http://localhost:3001/api/restaurants/${restaurant._id}`, { menuItems: newMenuItems }).then( res => {
      this.setState( {menuItems: newMenuItems });
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    let restaurant = this.state.restaurant;
    let menuItems = this.state.restaurant.menuItems.map( (menuItem, index) => {
      let pathname = `/menu_item/${menuItem.name}`
        return(
          <li key={index}>
            ${menuItem.price.toFixed(2)}
            <Link to={{
              pathname,
              state: {
                active: menuItem,
                restaurant: this.state.restaurant
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

          <MenuItemForm
            restaurant={this.state.restaurant} handleNewMenuItem={(e) => this.handleNewMenuItem(e)}
          />
      </div>
    )
  }
}

export default MenuItemBox;
