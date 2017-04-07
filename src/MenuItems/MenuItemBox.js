import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import MenuItemForm from "../MenuItems/MenuItemForm"
import "./MenuItemBox.css"

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
          <div className="menuItemDiv" key={index}>
            <p className="menuItemHeader"><span>{menuItem.name}</span> ${menuItem.price.toFixed(2)}</p>
            <p className="menuDescription">{menuItem.description}</p>
          </div>
        )
    })
    return(
      <div className="menuItemBox">
        <h2>Menu</h2>
        <div className="menuContainer">
        <div className="menu">
          {menuItems}
        </div>
        </div>
        <MenuItemForm
          restaurant={this.state.restaurant} handleNewMenuItem={(e) => this.handleNewMenuItem(e)}
        />
      </div>
    )
  }
}

export default MenuItemBox;
