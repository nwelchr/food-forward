import React from 'react';

const ItemIndexItem = ({ item, openUpdateModal, deleteNonprofitItem }) => {
  return (
    <li className="item items">
      <ul>
        <li>
          <img style={{ width: 200 }} src={item.image} />
        </li>
        <li>{item.name}</li>
        <li>{item.quota}</li>
        <li>{item.price}</li>
        <button onClick={() => openUpdateModal(item)}>Update</button>
        <button onClick={() => deleteNonprofitItem(item._id)}>Delete</button>
      </ul>
    </li>
  );
};

export default ItemIndexItem;
