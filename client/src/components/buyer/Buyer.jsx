import React from 'react';
import BuyerIndexContainer from "./BuyerIndexContainer";
import CheckoutItem from "./CheckoutItem";
import CheckoutModal from "./CheckoutModal";
class Buyer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkout: false
        };

        this.toggleCheckout = this
            .toggleCheckout
            .bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            this
                .props
                .fetchCart(this.props.user._id);
        }
    }

    toggleCheckout() {
        console.log('toggle');
        this.setState({
            checkout: Boolean(!this.state.checkout)
        });
    }

    render() {
        const renderModal = this.state.checkout
            ? <CheckoutModal/>
            : '';

        const name = this.props.user
            ? this.props.user.displayName
            : '';

        const cartCount = Object
            .keys(this.props.cart)
            .length;

        const icon = cartCount > 0
            ? (
                <div className="cart-icon-circle">
                    <div className="cart-icon-number">{cartCount}</div>
                </div>
            )
            : '';
        // let theCheckout = useremail – comapny donating to – shoping cart item
        return (
            <div>
                <div className="buyer-nav">
                    <div className="user-profile">{name}</div>
        
                        <div className="list-icon" onClick={() => this.ownProps.history.push("/shoppingList")}></div>
                        <div onClick={this.toggleCheckout} className="cart-icon">
                            {icon}
                 
                    </div>
                    <div className="blur-filter"/>
                </div>
                {renderModal
}
                <BuyerIndexContainer/>
            </div>
        );
    }
}

export default Buyer;
