import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import RestaurantBox from "../Restaurants/RestaurantBox"
import Restaurant from "../Restaurants/Restaurant"
import OrderBox from "../Orders/OrderBox"
import Order from "../Orders/Order"
import PersonalOrder from "../PersonalOrders/PersonalOrder"
import MenuItem from "../MenuItems/MenuItem"
import Item from "../Items/Item"
import "./App.css"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newOrder: false,
      orderDeleted: false,
      personalOrderDeleted: false
    }
  }

  handleOrderDeleted(){
    this.setState({ orderDeleted: true })
  }

  handlePersonalOrderDeleted(){
    this.setState({ personalOrderDeleted: true })
  }

  handleOrderAdded(){
    this.setState({ newOrder: true })
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/"><img className="logo" src={"DeliverWe.png"} alt="Deliver We Logo" /></Link>
              <span className="links">
                <Link to="/orders">
                  <div className="link">
                    Orders
                  </div>
                </Link>

                <Link to="/restaurants">
                  <div className="link">
                    Restaurants
                  </div>
                </Link>
              </span>
          </nav>

          <Route path="/"
            render={() => {
              if(this.state.orderDeleted || this.state.personalOrderDeleted) {
                this.setState({orderDeleted: false, personalOrderDeleted: false})
                return <Redirect to="/" />
              } else if (this.state.newOrder) {
                this.setState({newOrder: false})
                return <Redirect to="/orders" />
              } else {
                return null
              }
              console.log(this.state.orderDeleted);
            }}
          />

          <Route exact path="/"
            render={() =>
              <div className="homePage">
              <div className="mainPhotoContainer">
                <img className="mainPhoto" src={"berries.jpg"} alt="Food Image" />
              </div>

              <div className="mainLinks">
                  <Link to="/orders">
                    <span className="mainLink">
                      JOIN EXISTING ORDERS
                    </span>
                  </Link>
                    <p>OR</p>
                  <Link to="/restaurants">
                    <span className="mainLink">
                      START A NEW ONE
                    </span>
                  </Link>
                </div>
              </div>
            }
          />

          <Route path="/orders"
            render={() => {
              return(
                <OrderBox
                  handleOrderDeleted={() => this.handleOrderDeleted()} handlePersonalOrderDeleted={() => this.handlePersonalOrderDeleted()}
                />
              )
            }}
          />

          <Route path="/order/:restaurant"
            component={Order}
          />

          <Route path="/restaurants"
            render={() =>
              <RestaurantBox
                handleOrderAdded={() => this.handleOrderAdded()}
              />
            }
          />

          <Route path="/restaurant/:name"
            component={Restaurant}
          />

          <Route path="/personal_order/:name"
            component={PersonalOrder}
          />

          <Route path="/menu_item/:name"
            component={MenuItem}
          />

          <Route path="/item/:name"
            component={Item}
          />

        </div>
      </Router>
    );
  }
}

export default App;
