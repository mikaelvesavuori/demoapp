import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { DemoView } from './views/DemoView';
import { ProductsView } from './views/ProductsView';
import { CheckoutView } from './views/CheckoutView';

import { loadState, saveState, createListOfUpdatedProductsInCart } from './utils';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = loadState();
  }

  /**
   * @description Add single unit of ID'ed item to cart.
   */
  addItemToCart = (id) => this.updateCart(id, true);

  /**
  * @description Remove single unit of ID'ed item from cart.
  */
  removeItemFromCart = (id) => this.updateCart(id, false);

  /**
   * @description Update cart state. Called only via helper functions like `addItemToCart()` and `removeItemFromCart()`.
   */
  updateCart(event, add) {
    const [id, price] = event.target.id.split("#");

    const updatedProductsInCart = createListOfUpdatedProductsInCart(this.state.products, {id, price}, add);
    const updatedCount = Object.values(updatedProductsInCart).map((item) => item.count).reduce((a, b) => a + b, 0);

    this.setState({
      itemsInCart: updatedCount,
      products: updatedProductsInCart
    }, () => {
      saveState(this.state);
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/products" exact render={() =>
            <ProductsView
              addItemToCart={(e) => this.addItemToCart(e)}
              itemCount={this.state.itemsInCart} />}
          />
          <Route path="/checkout" exact render={() =>
            <CheckoutView
              addItemToCart={(e) => this.addItemToCart(e)}
              removeItemFromCart={(e) => this.removeItemFromCart(e)}
              products={this.state.products} />}
          />
          <Route path="/demo" exact component={DemoView} />
          <Redirect to="/demo" />
        </Switch>
      </Router>
    );
  }
}