import React from "react";

class ShoppingListItem extends React.Component {
    constructor(props) {
        super(props);
    } 
    render() {
        
        return (
           <tr>
            <td></td>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.amount}</td>
           </tr>
        );
    }
}

export default ShoppingListItem;