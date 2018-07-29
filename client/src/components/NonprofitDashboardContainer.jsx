import { connect } from 'react-redux';
import {
  fetchNonprofitItems,
  createNonprofitItem,
  updateNonprofitItem,
  deleteNonprofitItem
} from '../actions/nonprofit';

import NonprofitDashboard from './NonprofitDashboard';

const mapStateToProps = state => {
  console.log(state.auth);
  const displayName = state.auth ? state.auth.displayName : null;
  return {
    items: state.nonprofits,
    displayName
  };
};

const mapDispatchToProps = dispatch => ({
  fetchNonprofitItems: () => dispatch(fetchNonprofitItems()),
  createNonprofitItem: item => dispatch(createNonprofitItem(item)),
  updateNonprofitItem: item => dispatch(updateNonprofitItem(item)),
  deleteNonprofitItem: id => dispatch(deleteNonprofitItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonprofitDashboard);
