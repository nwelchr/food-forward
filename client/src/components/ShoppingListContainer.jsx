import { connect } from 'react-redux';
import { fetchCart } from "../actions/index";
import ShoppingList from './ShoppingList';

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart, 
    user: state.auth
});

const mapDispatchToProps = dispatch => ({
    fetchCart: id => dispatch(fetchCart(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
