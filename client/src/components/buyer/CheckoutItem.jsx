import React from 'react';
import { connect } from 'react-redux';

import {
  deleteItem,
  updateCartItem,
  deleteCartItem
} from '../../actions/index';

class CheckoutItem extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);

    this.update = this.update.bind(this);

    this.state = {
      amount: this.props.item.amount
    };
  }

  update(num) {
    let item = {
      nonprofitId: '5b5d085560cd313ab45be5a9',
      amount: this.state.amount + num,
      _id: this.props.item._id
    };

    this.props.updateCartItem(this.props.user._id, item);

    this.setState({
      amount: this.state.amount + num
    });
  }

  delete() {
    this.props.deleteCartItem(this.props.user._id, this.props.item._id);
  }

  render() {
    let { name, price, amount, image } = this.props.item;
    return (
      <li className="checkout-item">
        <img src={image} className="checkout-image" />
        <div className="checkout-item-details">
          <div className="c-i-name">{name}</div>
          <div className="c-i-cost">${price}</div>
        </div>
        <div className="checkout-quantity">
          <div onClick={() => this.update(-1)} className="co-decriment">
            &#9664;
          </div>
          <div className="co-num">{amount}</div>
          <div onClick={() => this.update(1)} className="co-increment">
            &#9654;
          </div>
        </div>
        <div onClick={this.delete} className="checkout-remove">
          &#128465;
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cart: state.cart,
  user: state.auth,
  item: state.cart[ownProps.itemId]
});

const mapDispatchToProps = dispatch => ({
  updateCartItem: (id, item) => dispatch(updateCartItem(id, item)),
  deleteCartItem: (id, itemId) => dispatch(deleteCartItem(id, itemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutItem);
