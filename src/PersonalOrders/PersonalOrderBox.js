import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

class PersonalOrderBox extends Component {
  constructor(props) {
    super(props);
    this.state = { personalOrders: [] };
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/personal_orders").then((response) => {
      this.setState({
        personalOrders: response.data
      })
    })
  }

  render() {
    let personalOrders = this.state.personalOrders.map( (personalOrder, index) => {
      let pathname = `/personal_order/${personalOrder._id}`
      return(
        <li key={index}>
          <Link to={{
            pathname,
            state: {active: personalOrder }
          }}>
            {personalOrder.name}
          </Link>
        </li>
      )
    })
    return(
      <div>
        <h2>PersonalOrders:</h2>
          <ol>
            {personalOrders}
          </ol>
      </div>
    )
  }
}

export default PersonalOrderBox;
