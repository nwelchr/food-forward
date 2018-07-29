import React from 'react';
import {connect} from 'react-redux';

import {fetchCart, updateCartItem, checkout} from "../../actions/index";
import CheckoutItem from './CheckoutItem';

class CheckoutModal extends React.Component {
  constructor(props) {
    super(props);

    this.generateItems = this
      .generateItems
      .bind(this);

    this.checkout = this
      .checkout
      .bind(this);

    this.totalCost = this
      .totalCost
      .bind(this);

    this.printList = this
      .printList
      .bind(this);
  }

  generateItems() {
    console.log("GI", this.props);
    return Object
      .values(this.props.cart)
      .map(itm => {
        return <CheckoutItem itemId={itm._id}/>;
      });
  }

  checkout() {
    this
      .props
      .checkout(this.props.user._id);
  }

  printList() {}

  totalCost() {
    let sum = 0.00;
    Object
      .values(this.props.cart)
      .forEach(item => {
        sum += Number(item.price) * Number(item.amount);
      });
    return sum;
  }

  render() {
    const items = this.generateItems();
    const cost = this.totalCost();
    return (
      <div className="checkout-modal">
        <ul className="checkout-ul">
          {items}
        </ul>
        <div className="checkout-total">
          <p>Total</p>
          <p>${cost}</p>
        </div>
        <div onClick={this.checkout} className="checkout-button">Checkout</div>
        <div onClick={this.printList}>Shopping List</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({cart: state.cart, user: state.auth});

const mapDispatchToProps = dispatch => ({
  updateCartItem: (id, item) => dispatch(updateCartItem(id, item)),
  checkout: (id) => dispatch(checkout(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
