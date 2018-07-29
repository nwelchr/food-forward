import { connect } from 'react-redux';
import { fetchCart, updateCartItem } from "../../actions/index";
import Buyer from './Buyer';

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart, 
    user: state.auth
});

const mapDispatchToProps = dispatch => ({
    fetchCart: id => dispatch(fetchCart(id)),
    updateCartItem: (id, item) => dispatch(updateCartItem(id, item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buyer);
