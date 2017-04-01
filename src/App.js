import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import RestaurantBox from "./Restaurants/RestaurantBox"
import Restaurant from "./Restaurants/Restaurant"
import OrderBox from "./Orders/OrderBox"
import Order from "./Orders/Order"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/restaurants">Restaurants</Link>
          </nav>

          <Route exact path="/"
            render={() =>
              <h1>This is the Home Page</h1>
            }
          />

          <Route path="/orders"
            render={() =>
              <OrderBox
              />
            }
          />

          <Route path="/order/:name"
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

        </div>
      </Router>
    );
  }
}

export default App;
