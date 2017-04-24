import React, { Component } from "react";
// import axios from "axios";
import "./PersonalOrderForm.css"

class PersonalOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let order = this.props.order;
    let name = this.state.name.trim();
    order.personalOrders.push( {name: name, items: [] })
    let personalOrders = order.personalOrders
    this.props.handleNewPersonalOrder(personalOrders)
    this.setState({ name: undefined })
  }

  render(){
    return(
      <div className="personalOrderForm">
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Name..." value={ this.state.name } onChange={ this.handleNameChange } />
          <input className="button" type="submit" value="Join Order" />
        </form>
      </div>
    )
  }
}

export default PersonalOrderForm;
