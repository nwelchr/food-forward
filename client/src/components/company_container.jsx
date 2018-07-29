import { connect } from 'react-redux';
import {
  fetchNonprofitItems,
  createNonprofitItem,
  updateNonprofitItem,
  deleteNonprofitItem } from '../../actions/nonprofit';

import Company from './company';

const mapStateToProps = state => ({
  items: state.nonprofits
});

const mapDispatchToProps = dispatch => ({
  fetchNonprofitItems: () => dispatch(fetchNonprofitItems()),
  createNonprofitItem: (id,item) => dispatch(createNonprofitItem(id,item)),
  updateNonprofitItem: (id,item) => dispatch(deleteNonprofitItem(id,item)),
  deleteNonprofitItem: (id) => dispatch(deleteNonprofitItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
