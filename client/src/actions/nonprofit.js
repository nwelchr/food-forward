import axios from 'axios';
import { FETCH_NONPROFIT_ITEMS,
  CFREATE_NONPROFIT_ITEM,
  UPDATE_NONPROFIT_ITEM,
  DELETE_NONPROFIT_ITEM } from './types';

export const fetchNonprofitItems = (id) => async dispatch => {
  const res = await axios.get(`/api/nonprofits/${id}/items`);
  dispatch({ type: RECEIVE_NONPROFIT_ITEMS, payload: res.data });
};

export const createNonprofitItem = (id,item) => async dispatch => {
  const res = await axios.post(`/api/nonprofits/${id}/items`, item);

  dispatch({ type: RECEIVE_NONPROFIT_ITEM, payload: res.data });
};

export const updateNonprofitItem = (item) => async dispatch => {
  const res = await axios.put('/api/blogs', item);

  history.push('/blogs');
  dispatch({ type: RECEIVE_NONPROFIT_ITEM, payload: res.data });
};

export const deleteNonprofitItem = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: DELETE_NONPROFIT_ITEM, payload: res.data });
};
