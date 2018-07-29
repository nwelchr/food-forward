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
