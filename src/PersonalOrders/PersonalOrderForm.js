import React, { Component } from "react";
import axios from "axios";

class PersonalOrderForm extends Component {
  constructor(props) {
    super(props);
    let orderId = this.props.orderId;
    this.state = {
      name: "",
      orderId: orderId
     };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let orderId = this.state.orderId.trim();
    let name = this.state.name.trim();
    axios.post("http://localhost:3001/api/personal_orders", { name: name, orderId: orderId }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      console.log(this.state.name);
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }

  render(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Name..." value={ this.state.name } onChange={ this.handleNameChange } />
        <input type="submit" value="Join Order" />
      </form>
    )
  }
}

export default PersonalOrderForm;
