import React, { Component } from "react";
import axios from "axios";

class MenuItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      price: undefined,
      description: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handlePriceChange(e) {
    let price = parseFloat(e.target.value)
    this.setState( { price: price });
  }

  handleDescriptionChange(e) {
    this.setState( { description: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let restaurant = this.props.restaurant;
    let name = this.state.name.trim();
    let price = this.state.price
    console.log(price);
    let description = this.state.description.trim();
    restaurant.menuItems.unshift( {name: name, price: price, description: description })
    let menuItems = restaurant.menuItems
    axios.put(`http://localhost:3001/api/restaurants/${restaurant._id}`, { menuItems: menuItems }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: undefined, price: undefined, description: undefined })
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Name..." onChange={ this.handleNameChange } />
          <input type="text" placeholder="Price..." onChange={ this.handlePriceChange } />
          <input type="text" placeholder="Description..." onChange={ this.handleDescriptionChange } />
          <input type="submit" value="Create Menu Item" />
        </form>
      </div>
    )
  }
}

export default MenuItemForm;
