import React, { Component } from "react";
import axios from "axios"
// import { Link } from "react-router-dom"
import "./MenuItemBox.css"
// import MenuItemForm from "../MenuItems/MenuItemForm"


class MenuItemBox extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant;
    this.state = {
      restaurant: restaurant,
      menuItems: restaurant.menuItems
     };
  }

  // handleNewMenuItem(newMenuItems){
  //   let restaurant = this.state.restaurant
  //   let name = this.state.restaurant.name.trim();
  //   let deliveryFee = this.state.restaurant.deliveryFee;
  //   let deliveryMin = this.state.restaurant.deliveryMin;
  //   let tax = this.state.restaurant.tax;
  //   let logo = this.state.restaurant.logo;
  //   axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${this.state.restaurant._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { name, deliveryFee, deliveryMin, tax, logo, menuItems: newMenuItems }).then( res => {
  //     this.setState( {menuItems: newMenuItems });
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  render() {
    let menuItems = this.state.restaurant.menuItems.map( (menuItem, index) => {
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
      </div>
    )
  }
}

export default MenuItemBox;
