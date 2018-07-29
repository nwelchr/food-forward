import { connect } from 'react-redux';
import { fetchNonprofitItems, fetchCart, addCartItem, updateCartItem } from "../../actions/index";
import Buyer from './Buyer';

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    fetchNonprofitItems: id => dispatch(fetchNonprofitItems(id)), 
    fetchCart: id => dispatch(fetchCart(id)), 
    addCartItem: (id, item) => dispatch(addCartItem(id, item)), 
    updateCartItem: (id, item) => dispatch(updateCartItem(id, item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buyer);
