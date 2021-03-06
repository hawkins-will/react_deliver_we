import React, { Component } from "react";
import marked from "marked";
import axios from "axios";

class MenuItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      menuItem: this.props.location.state.active,
      restaurant: this.props.location.state.restaurant,
      name: undefined,
      price: undefined,
      description: undefined
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }


  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handlePriceChange(e) {
    this.setState( { price: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState( { description: e.target.value });
  }

  updateMenuItem(e) {
    e.preventDefault();
    let restaurant = this.state.restaurant;
    let name = this.state.restaurant.name.trim();
    let deliveryFee = this.state.restaurant.deliveryFee;
    let deliveryMin = this.state.restaurant.deliveryMin;
    let tax = this.state.restaurant.tax;
    let logo = this.state.restaurant.logo;
    let menuItemId = this.state.menuItem._id;
    let newArray = restaurant.menuItems.filter((menuItem) => {
      return menuItem._id !== menuItemId
    })
    let selectedMenuItem = restaurant.menuItems.filter((menuItem) => {
      return menuItem._id === menuItemId
    })
    if (this.state.name){
      selectedMenuItem[0].name = this.state.name
    }
    if (this.state.price){
      selectedMenuItem[0].price = this.state.price
    }
    if (this.state.description){
      selectedMenuItem[0].description = this.state.description
    }

    newArray.unshift(selectedMenuItem[0])
    axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${this.state.restaurant._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { name, deliveryFee, deliveryMin, tax, logo, menuItems: newArray }).then( res => {
      console.log("Menu Item Updated");
    })
    .catch(err => {
      console.error(err);
    })
  }

  deleteMenuItem(e) {
    let restaurant = this.state.restaurant;
    let menuItemId = this.state.menuItem._id;
    let newArray = restaurant.menuItems.filter((menuItem) => {
      return menuItem._id !== menuItemId
    })
    axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${this.state.restaurant._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { menuItems: newArray }).then( res => {
      console.log("Menu Item Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div>
        <p>{this.state.menuItem.name} Page</p>
        <p>${this.state.menuItem.price.toFixed(2)}</p>
        <p>{this.state.menuItem.description}</p>
        <form onSubmit={ this.updateMenuItem }>
          <input type="text" placeholder={ this.state.menuItem.name } onChange={ this.handleNameChange } />
          <input type="text" placeholder={ this.state.menuItem.price } onChange={ this.handlePriceChange } />
          <input type="text" placeholder={ this.state.menuItem.description } onChange={ this.handleDescriptionChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deleteMenuItem }>Delete</button>
      </div>
    )
  }
}

export default MenuItem;
