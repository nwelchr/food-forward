import { connect } from 'react-redux';
import { fetchCart } from "../../actions/index";
import Buyer from './Buyer';

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    fetchCart: id => dispatch(fetchCart(id)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buyer);
