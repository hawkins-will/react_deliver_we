import React, { Component } from "react";
import axios from "axios";

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      deliveryFee: undefined,
      deliveryMin: undefined,
      tax: undefined,
      logo: undefined
     };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFeeChange = this.handleFeeChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleLogoChange = this.handleLogoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handleFeeChange(e) {
    let fee = parseFloat(e.target.value)
    this.setState( { deliveryFee: fee });
  }

  handleMinChange(e) {
    let min = parseFloat(e.target.value)
    this.setState( { deliveryMin: min });
  }

  handleTaxChange(e) {
    let tax = parseFloat(e.target.value)
    this.setState( { tax: tax });
  }

  handleLogoChange(e) {
    this.setState( { logo: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let deliveryFee = this.state.deliveryFee;
    let deliveryMin = this.state.deliveryMin;
    let tax = this.state.tax;
    let logo = this.state.logo;
    this.props.handleNewRestaurant({ name, deliveryFee, deliveryMin, tax, logo, menutItems: [] })
    this.setState({ name: undefined, deliveryFee: undefined, deliveryMin: undefined, tax: undefined, logo: undefined })
  }

  render(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Restaurant Name..." onChange={ this.handleNameChange } />
        <input type="text" placeholder="Restaurant Delivery Fee..." onChange={ this.handleFeeChange } />
        <input type="text" placeholder="Restaurant Delivery Minimum..." onChange={ this.handleMinChange } />
        <input type="text" placeholder="Restaurant Tax..." onChange={ this.handleTaxChange } />
        <input type="text" placeholder="Restaurant Logo..." onChange={ this.handleLogoChange } />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

export default RestaurantForm;
