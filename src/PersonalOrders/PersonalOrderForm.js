import React, { Component } from "react";
import axios from "axios";

class PersonalOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
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
    order.personalOrders.push( {name: name })
    let personalOrders = order.personalOrders
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: personalOrders }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Name..." value={ this.state.name } onChange={ this.handleNameChange } />
          <input type="submit" value="Join Order" />
        </form>
      </div>
    )
  }
}

export default PersonalOrderForm;
