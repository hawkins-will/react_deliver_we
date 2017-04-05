import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  // Redirect
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
  render() {
    return (
      <Router>
        <div>
          <nav>
            <h1>DeliverWe</h1>
            <span className="link">
              <Link to="/">Home</Link>
            </span>

            <span className="link">
              <Link to="/orders">Orders</Link>
            </span>

            <span className="link">
              <Link to="/restaurants">Restaurants</Link>
            </span>
          </nav>

          <Route exact path="/"
            render={() =>
              <div>
                <span className="link">
                  <Link to="/orders">Orders</Link>
                </span>

                <span className="link">
                  <Link to="/restaurants">Restaurants</Link>
                </span>
              </div>
            }
          />

          <Route path="/orders"
            render={() =>
              <OrderBox
              />
            }
          />

          <Route path="/order/:restaurant"
            component={Order}
          />

          <Route path="/restaurants"
            render={() =>
              <RestaurantBox
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
