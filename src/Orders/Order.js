import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom"
import PersonalOrderBox from "../PersonalOrders/PersonalOrderBox"
import Bill from "../Bills/Bill"
import "./Order.css"
var schedule = require('node-schedule');

class Order extends Component {
  constructor(props){
    super(props)
    this.state = {
      order: this.props.location.state.active,
      restaurant: undefined,
      hour: "6",
      minute: "00"
    }
    this.deleteOrder = this.deleteOrder.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  deleteOrder(e) {
    let restaurant = this.state.restaurant
    axios.delete(`http://localhost:3001/api/orders/${this.state.order._id}`, { restaurant: restaurant }).then( res => {
    })
    .catch(err => {
      console.error(err);
    }).then(() => {
      this.props.location.props.handleOrderDeleted()
    })
  }

  handlePersonalOrderDeleted(){
    this.props.location.props.handlePersonalOrderDeleted()
  }




  handleHourChange(e){
    this.setState( { hour: e.target.value });
  }

  handleMinuteChange(e){
    this.setState( { minute: e.target.value });
  }

  checkDate(e) {
    e.preventDefault();
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getUTCMonth()
    var day = date.getUTCDate()
    var hour = this.state.hour
    var minute = this.state.minute
    var newDate = new Date(year, month, day, hour, minute)
    let restaurant = this.state.restaurant
    let order = this.state.order
    var action = schedule.scheduleJob(newDate, function(){
      console.log("Hi There!");
      axios.post("http://localhost:3001/api/past_orders", { order })
      .catch(err => {
        console.log(err)
      }).then(() => {
        axios.delete(`http://localhost:3001/api/orders/${order._id}`, { restaurant }).then( res => {
        })
        .catch(err => {
          console.error(err);
        })
      })
    });
    console.log("Schedule Set for " + newDate);
  }


  render() {
    return(
      <div className="orderPage">
        <div className="orderLeft">
          <p className="orderTitle">Order from "{this.state.order.restaurant}" <span className="cancelOrder" onClick={ this.deleteOrder }> cancel</span></p>

          <form onSubmit={ this.checkDate }>
            <select name="hour" onChange={ this.handleHourChange } >
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">1</option>
              <option value="14">2</option>
              <option value="15">3</option>
              <option value="16">4</option>
              <option value="17">5</option>
              <option value="18">6</option>
              <option value="19">7</option>
              <option value="20">8</option>
              <option value="21">9</option>
              <option value="22">10</option>
              <option value="24">11</option>
              <option value="23">12</option>
            </select>

            <select name="minute" onChange={ this.handleMinuteChange }>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="50">50</option>
            </select>

            <input className="button" type="submit" value="Order Time" />
          </form>

          <PersonalOrderBox
            order={this.state.order} handlePersonalOrderDeleted={() => this.handlePersonalOrderDeleted()}
          />
        </div>
        <div className="orderRight">
          <Bill
            order={this.state.order}
          />
        </div>
      </div>
    )
  }
}

export default Order;
