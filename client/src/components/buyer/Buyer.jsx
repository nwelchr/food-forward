import React from 'react';
import BuyerIndexContainer from "./BuyerIndexContainer";
import CheckoutItem from "./CheckoutItem"; 
class Buyer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCart();
    }

    render() {
        let item1 = {name: 'Shoes', price: '30.00', quantity: '3'};
        let item2 = {name: 'Banana', price: '10.00', quantity: '1'};
        let item3 = {name: 'Turkey', price: '400.00', quantity: '2'};
        let item11 = { name: 'Shoes', price: '30.00', quantity: '3' };
        let item22 = { name: 'Banana', price: '10.00', quantity: '1' };
        let item33 = { name: 'Turkey', price: '400.00', quantity: '2' };
        let items = [item1, item2, item3, item11, item22, item33].map(itm => {
            return <CheckoutItem name={itm.name} price={itm.price} quantity={itm.quantity} /> 
        });
        // let theCheckout = 
        // useremail – comapny donating to – shoping cart item 
        return (<div>
            <div className="buyer-nav">
              <div className="user-profile">User Email</div>
              <div className="cart-icon">
                <div className="cart-icon-circle">
                  <div className="cart-icon-number">2</div>
                </div>
              </div>
              <div className="blur-filter" />
            </div>

            <div className="checkout-modal">
              <ul className="checkout-ul">
                {items}
              </ul>
              <div className="checkout-total">
                <p>Total</p>
                <p>$300.00</p>
              </div>
              <div className="checkout-button">Checkout</div>
            </div>
        </div>);
    }
}


export default Buyer;

{/* <li className="checkout-item">
    <div className="checkout-image" />
    <div className="checkout-item-details">
        <div className="c-i-name">Shoes</div>
        <div className="c-i-cost">$30.00</div>
    </div>
    <div className="checkout-quantity">
        <div className="co-decriment">&#9664;</div>
        <div className="co-num">3</div>
        <div className="co-increment">&#9654;</div>
    </div>
    <div className="checkout-remove">	&#128465;</div>
</li>
    <li className="checkout-item">
        <div className="checkout-image" />
        <div className="checkout-item-details">
            <div className="c-i-name">Shoes</div>
            <div className="c-i-cost">$30.00</div>
        </div>
        <div className="checkout-quantity">
            <div className="co-decriment">&#9664;</div>
            <div className="co-num">3</div>
            <div className="co-increment">&#9654;</div>
        </div>
        <div className="checkout-remove">	&#128465;</div>
    </li>
    <li className="checkout-item">
        <div className="checkout-image" />
        <div className="checkout-item-details">
            <div className="c-i-name">Shoes</div>
            <div className="c-i-cost">$30.00</div>
        </div>
        <div className="checkout-quantity">
            <div className="co-decriment">&#9664;</div>
            <div className="co-num">3</div>
            <div className="co-increment">&#9654;</div>
        </div>
        <div className="checkout-remove">	&#128465;</div>
    </li> */}