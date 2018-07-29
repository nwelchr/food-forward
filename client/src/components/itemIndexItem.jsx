import React from 'react';

const ItemIndexItem = ({ item, openUpdateModal, deleteNonprofitItem }) => {
  const amtRaised = item.amtRaised || 0;
  return (
    <tr className="item-index-item">
      <td>
        <img src={item.image} />
      </td>
      <td className="name">{item.name}</td>
      <td>
        <p>Quota:</p>
        <p>${item.quota}</p>
      </td>
      <td>
        <p>Remaining:</p>
        <p>${item.quota - amtRaised}</p>
      </td>
      <td>
        <p>Price:</p>
        <p>${item.price}</p>
      </td>
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
    </tr>
  );
};

export default ItemIndexItem;
