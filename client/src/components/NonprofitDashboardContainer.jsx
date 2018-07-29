import { connect } from 'react-redux';
import {
  fetchNonprofitItems,
  createNonprofitItem,
  updateNonprofitItem,
  deleteNonprofitItem
} from '../actions/nonprofit';

import NonprofitDashboard from './NonprofitDashboard';

const mapStateToProps = state => {
  const userId = state.auth ? state.auth.id : null;
  return {
    items: state.nonprofits,
    userId
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
