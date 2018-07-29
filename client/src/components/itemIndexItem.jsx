import React from "react";

const ItemIndexItem = ({ item }) => {
    return (
        <li className="item items">
            <ul>
                <li><img src={item.image}></img></li>
                <li>{item.name}</li>
                <li>{item.quota}</li>
                <li>{item.price}</li>
            </ul>
        </li>
    );
};

export default ItemIndexItem;
