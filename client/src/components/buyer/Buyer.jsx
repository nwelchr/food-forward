import React from 'react';
import BuyerIndexContainer from "./BuyerIndexContainer";
import CheckoutItem from "./CheckoutItem";
import CheckoutModal from "./CheckoutModal";
class Buyer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.user) 
            this.props.fetchCart(this.props.user._id);
        }
    
    render() {

        // let theCheckout = useremail – comapny donating to – shoping cart item
        return (
            <div>
                <div className="buyer-nav">
                    <div className="user-profile">User Email</div>
                    <div className="cart-icon">
                        <div className="cart-icon-circle">
                            <div className="cart-icon-number">2</div>
                        </div>
                    </div>
                    <div className="blur-filter"/>
                </div>
                <BuyerIndexContainer/>
                <CheckoutModal/>
            </div>
        );
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
    </li> */
}
