import React from "react";

const ItemIndexItem = ({ item }) => {
    return (
        <li className="item items">
            <ul>
                <li>{item.name}</li>
                <li>{item.quota}</li>
            </ul>
        </li>
    );
}

export default ItemIndexItem;