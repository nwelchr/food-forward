import React from "react";
import ShoppingListItem from "./ShoppingListItem";

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this
            .props
            .fetchCart(this.props.user._id);
    }

    render() {
        let items = Object
            .values(this.props.cart)
            .map(item => <ShoppingListItem item={item}/>);

        return (
            <div>
                <nav className='shopping-list-Nav'>
                    <h1 className="shopping-header">Shopping List</h1>
                    <button
                        className="user-dashboard"
                        onClick={() => this.props.history.push('/user_dashboard')}>
                        Continue Shopping
                    </button>
                </nav>

                <table>
                    <th className="checkbox"></th>
                    <th>Item</th>
                    <th>Quantity</th>
                    {items}
                </table>
                <div className='guidelines'>
                    <h5>Guidelines:</h5>
                    <p>
                        <strong>Food We Do&nbsp;Accept:</strong>
                    </p>
                    <ul className='guideline-list'>
                        <li>Unexpired perishable foods</li>
                        <li>Refrigerated perishable foods (must be below 40°F)</li>
                        <li>Frozen perishable foods (must be below 28°F)</li>
                    </ul>
                    <p>
                        <strong>Food We Do Not Accept:</strong>
                    </p>
                    <ul className='guideline-list'>
                        <li>Vitamins and nutritional aids</li>
                        <li>Pet food</li>
                        <li>Baby formula</li>
                        <li>Bulk products that are unlabeled for ingredients and allergens</li>
                        <li>Foods that were not kept at the appropriate temperatures</li>
                        <li>Mixed food and perishables from catered events</li>
                        <li>Restaurant food</li>
                        <li>Foods intended for raw consumption (sushi or seafood)</li>
                        <li>Canned goods that are open, punctured, bulging or seriously damaged</li>
                        <li>Home prepared, home canned or home jarred products</li>
                        <li>Items that contain alcohol or have alcohol in the product name</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ShoppingList;