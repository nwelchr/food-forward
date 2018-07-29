import React from 'react';

const ItemIndexItem = ({ item, openUpdateModal, deleteNonprofitItem }) => {
  return (
    <table className="item-index-item">
      <td>
        <img src={item.image} />
      </td>
      <td className="name">{item.name}</td>
      <td>Quota: ${item.quota}</td>
      <td>Price: ${item.price}</td>
      <td>
        <button
          className="change-item-button update"
          onClick={() => openUpdateModal(item)}>
          Update
        </button>
      </td>
      <td>
        <button
          className="change-item-button delete"
          onClick={() => deleteNonprofitItem(item._id)}>
          Delete
        </button>
      </td>
    </table>
  );
};

export default ItemIndexItem;
