import axios from 'axios';
import { RECEIVE_NONPROFIT_ITEMS,
 RECEIVE_NONPROFIT_ITEM,
 DELETE_NONPROFIT_ITEM } from './types';

export const fetchNonprofitItems = (id) => async dispatch => {
  const res = await axios.get(`/api/nonprofits/${id}/items`);
  dispatch({ type: RECEIVE_NONPROFIT_ITEMS, payload: res.data });
};

export const createNonprofitItem = (id,item) => async dispatch => {
  const res = await axios.post(`/api/nonprofits/${id}/items`, item);

  dispatch({ type: RECEIVE_NONPROFIT_ITEM, payload: res.data });
};

export const updateNonprofitItem = (id,item) => async dispatch => {
  const res = await axios.put(`/api/nonprofits/${id}/items`, item);

  dispatch({ type: RECEIVE_NONPROFIT_ITEM, payload: res.data });
};

export const deleteNonprofitItem = (id) => async dispatch => {
  const res = await axios.delete(`/api/nonprofits/${id}/items`);

  dispatch({ type: DELETE_NONPROFIT_ITEM, payload: res.data });
};
