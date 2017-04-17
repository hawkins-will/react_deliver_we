import React, { Component } from "react";
import axios from "axios";
import "./OrderForm.css"
var schedule = require('node-schedule');

class OrderForm extends Component {
  constructor(props) {
    super(props);
    var date = new Date()
    var hour = date.getHours()
    this.state = {
      restaurant: this.props.restaurant,
      restaurantName: this.props.restaurant.name,
      restaurantId: this.props.restaurant._id,
      deliveryFee: this.props.restaurant.deliveryFee,
      deliveryMin: this.props.restaurant.deliveryMin,
      tax: this.props.restaurant.tax,
      hour: hour,
      minute: "00"
     };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleHourChange(e){
    this.setState( { hour: e.target.value });
  }

  handleMinuteChange(e){
    this.setState( { minute: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let restaurantName = this.state.restaurantName.trim();
    let restaurantId = this.state.restaurantId.trim();
    let deliveryFee = this.state.deliveryFee;
    let deliveryMin = this.state.deliveryMin;
    let tax = this.state.tax;
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getUTCMonth()
    var day = date.getUTCDate()
    var hour = this.state.hour
    var minute = this.state.minute
    var newDate = new Date(year, month, day, hour, minute)
    var time = ""
    if (parseInt(hour) === 12) {
      time = hour + ":" + minute + " pm"
    } else if (parseInt(hour) === 24) {
      hour = parseInt(hour) - 12
      hour = hour.toString()
      time = hour + ":" + minute + " am"
    } else if (parseInt(hour) > 12) {
      hour = parseInt(hour) - 12
      hour = hour.toString()
      time = hour + ":" + minute + " pm"
    } else {
      time = hour + ":" + minute + " am"
    }

    axios.post("http://localhost:3001/api/orders", { restaurant: restaurantName, restaurantId, deliveryFee, deliveryMin, tax, time }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    }).then(() => {
      let restaurant = this.state.restaurant
      let orderId = this.state.data.data._id
      let order = {}
      var action = schedule.scheduleJob(newDate, function(){
        console.log("Hi There!");
        axios.get("http://localhost:3001/api/orders/" + orderId).then( res => {
          order = res.data
        }).then (() => {
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
        })
      })
    }).then(() => {
      this.props.handleOrderAdded()
    })
  }



  showModal(e) {
    document.getElementById('myModal').style.display='flex'
  }

  closeModal(e){
    document.getElementById('myModal').style.display='none'
  }



  render(){
    var date = new Date()
    var hour = date.getHours()
    let hoursArray = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18, 19, 20, 21, 22, 23, 24]
    let availableHours = hoursArray.filter((val) => {
      return val >= hour
    })
    console.log(availableHours);
    let hourOptions = availableHours.map( (num, index) => {
      if (num > 12) {
        var newNum = num - 12
        return(
          <option value={num.toString()}>{newNum.toString()}</option>
        )
      } else {
        return(
          <option value={num.toString()}>{num.toString()}</option>
        )
      }
    })
    return(
      <div className="createOrder">
        <p className="newOrder" onClick={this.showModal}>New Order</p>

        <div id="myModal" className="modal">
          <div className="modalContent">
            <span className="close" onClick={this.closeModal}>&times;</span>
            <div className="innerModal">
            <p>When should we place this order?</p>
              <form onSubmit={ this.handleSubmit }>
                <select name="hour" onChange={ this.handleHourChange } >
                  {hourOptions}
                </select>

                <select name="minute" onChange={ this.handleMinuteChange }>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                </select>

                <input className="button" type="submit" value="Start Order" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderForm;
