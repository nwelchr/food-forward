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
  }

  generateItems() {
    console.log("GI", this.props);
    return Object
      .values(this.props.cart)
      .map(itm => {
        return <CheckoutItem
          name={itm.name}
          price={itm.price}
          amount={itm.amount}
          image={itm.image}/>;
      });
  }

  checkout() {

    this
      .props
      .checkout(this.props.user._id);
  }

  render() {
    const items = this.generateItems();
    return (
      <div className="checkout-modal">
        <ul className="checkout-ul">
          {items}
        </ul>
        <div className="checkout-total">
          <p>Total</p>
          <p>$300.00</p>
        </div>
        <div onClick={this.checkout} className="checkout-button">Checkout</div>
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
