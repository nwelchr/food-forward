import React from "react";
import ShoppingListItem from "./ShoppingListItem";

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCart(this.props.user._id);
    }

    render() {
        let items = Object.values(this.props.cart).map(item =>  <ShoppingListItem item={item}/>);

        return(
            <div>
              <nav className='shopping-list-Nav'>
                <h1 className="shopping-header">Shopping List</h1>
                <button className="user-dashboard" onClick={() => this.props.history.push('/user_dashboard')}> Continue Shopping </button>
              </nav>

                <table>
                    <th className="checkbox"></th>
                    <th>Item</th>
                    <th>Quantity</th>
                    {items}
                </table>
            </div>
        );
    }
}

export default ShoppingList;