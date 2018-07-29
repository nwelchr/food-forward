import React from "react";


class CheckoutItem extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.props.fetchNonprofitItems();
    // }

    render() {
        let {name, price, quantity} = this.props; 
        return (
            <li className="checkout-item">
                <div className="checkout-image" />
                <div className="checkout-item-details">
                    <div className="c-i-name">{name}</div>
                    <div className="c-i-cost">${price}</div>
                </div>
                <div className="checkout-quantity">
                    <div className="co-decriment">&#9664;</div>
                    <div className="co-num">{quantity}</div>
                    <div className="co-increment">&#9654;</div>
                </div>
                <div className="checkout-remove">	&#128465;</div>
            </li>
        );
    }
}

export default CheckoutItem;