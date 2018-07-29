import { connect } from 'react-redux';
import { fetchNonprofitItems, addCartItem, updateCartItem } from "../../actions/index";
import BuyerIndex from './BuyerIndex';

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart,
    items: state.items,
    user: state.auth
});

const mapDispatchToProps = dispatch => ({
    fetchNonprofitItems: id => dispatch(fetchNonprofitItems(id)), 
    addCartItem: (id, item) => dispatch(addCartItem(id, item)), 
    updateCartItem: (id, item) => dispatch(updateCartItem(id, item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerIndex);
