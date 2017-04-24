import React, { Component } from "react";
// import axios from "axios";
import "./PersonalOrderForm.css"

class PersonalOrderForm extends Component {
  constructor(props) {
    super(props);
    let order = this.props.order;
    let tempArray = []
    order.personalOrders.forEach(function(personalOrder) {
      tempArray.push(personalOrder.id);
    })
    tempArray = tempArray.sort();
    console.log(tempArray);
    let temporaryId = 0
    if (tempArray.length > 0) {
      console.log("hi");
      temporaryId = tempArray[tempArray.length - 1] + 1;
    }
    this.state = {
      name: undefined,
      temporaryId: temporaryId
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    console.log(this.state.temporaryId);
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let temporaryId = this.state.temporaryId
    let order = this.props.order;
    let name = this.state.name.trim();
    order.personalOrders.push( {name: name, items: [], id: temporaryId })
    let personalOrders = order.personalOrders
    this.props.handleNewPersonalOrder(personalOrders)
    this.setState({ name: undefined, temporaryId: temporaryId + 1 })
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
