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

        this.changeStateTest = this.changeStateTest.bind(this); 
    }

    componentDidMount() {
        if (this.props.user) {
            this
                .props
                .fetchCart(this.props.user._id);
        }
    }

    componentWillUnmount() {
        window.clearTimeout(); 
    }

    toggleCheckout() {
        console.log('toggle');
        if (this.state.checkout) {
            const modal = document.getElementsByClassName("checkout-modal")[0];
            modal.classList.remove("checkout-modal-top");
            setTimeout(this.changeStateTest, 800); 
        }else{
            this.setState({checkout: Boolean(!this.state.checkout)}); 
        }
    }

    changeStateTest() {
        this.setState({checkout: Boolean(!this.state.checkout)});
    }

    render() {
        const renderModal = this.state.checkout
            ? <CheckoutModal />
            : '';

        const bgModal = this.state.checkout
            ? <div onClick={this.toggleCheckout} className="bg-modal"></div>
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
                </div>
                {renderModal}
                {bgModal}
                <BuyerIndexContainer/>
            </div>
        );
    }
}

export default Buyer;
