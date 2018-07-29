import { connect } from 'react-redux';
// import { fetchItems, updateItem } from '../../actions/castle_actions';

import Company from './company';

const mapStateToProps = state => ({
  // items: state.items,
  items: {1: {id: 1, name: "banana", price: 20.00, quota: 500, image:'url'}}
});

const mapDispatchToProps = dispatch => ({
  // fetchItems: () => dispatch(fetchItems()),
  // updateItem: (item) => dispatch(updateItem())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
