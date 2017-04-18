import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import OrderForm from "../Orders/OrderForm"
import MenuItemBox from "../MenuItems/MenuItemBox"
import "./Restaurant.css"



class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant: this.props.location.state.active,
      logo: undefined
    }
    this.handleLogoChange = this.handleLogoChange.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }


  handleLogoChange(e) {
    this.setState( { logo: e.target.value });
  }

  updateRestaurant(e) {
    e.preventDefault();
    let logo = this.state.logo.trim();
    axios.put(`http://localhost:3001/api/restaurants/${this.state.restaurant._id}`, { logo: logo }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ logo: undefined })
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

  handleOrderAdded(){
    this.props.location.props.handleOrderAdded()
  }

  render() {
    return(
      <div className="restaurantPage">
        <div className="restaurantHeader">
          <h1>{this.state.restaurant.name}</h1>
          <p><span>Delivery Fee</span>${this.state.restaurant.deliveryFee.toFixed(2)}</p>
          <p><span>Minimum</span>${this.state.restaurant.deliveryMin.toFixed(2)}</p>
          <OrderForm
            restaurant={this.state.restaurant}
            handleOrderAdded={() => this.handleOrderAdded()}
          />
        </div>
        <form onSubmit={ this.updateRestaurant }>
          <input type="text" placeholder={ this.state.restaurant.logo } onChange={ this.handleLogoChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deleteRestaurant }>Delete</button>

        <MenuItemBox
          restaurant={this.state.restaurant}
        />
      </div>
    )
  }
}

export default Restaurant;
