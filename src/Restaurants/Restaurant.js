import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import OrderForm from "../Orders/OrderForm"
import MenuItemBox from "../MenuItems/MenuItemBox"
import MenuItemForm from "../MenuItems/MenuItemForm"


class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant: this.props.location.state.active,
      name: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }


  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  updateRestaurant(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    axios.put(`http://localhost:3001/api/restaurants/${this.state.restaurant._id}`, { name: name }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }

  deleteRestaurant(e) {
    axios.delete(`http://localhost:3001/api/restaurants/${this.state.restaurant._id}`, { name: name }).then( res => {
      console.log("Restaurant Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div>
        <p>{this.state.restaurant.name} Page</p>
        <form onSubmit={ this.updateRestaurant }>
          <input type="text" placeholder={ this.state.restaurant.name } onChange={ this.handleNameChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deleteRestaurant }>Delete</button>

        <OrderForm
          restaurant={this.state.restaurant._id}
        />

        <MenuItemBox
          restaurant={this.state.restaurant}
        />

        <MenuItemForm
          restaurant={this.state.restaurant}
        />

      </div>
    )
  }
}

export default Restaurant;
