import React from "react";

class BuyerIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inCart: !!this.props.cart,
            amount: this.props.cart ? this.props.cart.amount : 0 
        };
    }

    update(field) {
        return e => {
          this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.inCart) {
            this.props.updateCart()
        } else {

        }
    }

    render() {



        return(
            <li>
                <ul>
                    <li><img src={this.props.item.image} /></li>
                    <li>{this.props.item.name}</li>
                    <li>{this.props.item.price}</li>
                    <li><form
                        onSubmit={this.handleSubmit}
                    >
                        <label>
                            Quantity: 
                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={this.state.amount}
                                onChange={this.update("amount")}
                            />
                            
                            <input
                                type="submit"
                                value={this.state.inCart ? "Update Amount" : "Add Item"}
                            />
                        </label>
                    </form></li>
                </ul>
            </li>
        );
    }
}

export default BuyerIndexItem;