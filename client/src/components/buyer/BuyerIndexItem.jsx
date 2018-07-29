import React from "react";

class BuyerIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inCart: !!this.props.cart,
            amount: 0 
        };
    }

    update(field) {
        return e => {
          this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let item = {
            nonProfitId: "5b5d085560cd313ab45be5a9", 
            amount: this.state.amount,
            _id: this.props.item._id,
        };
        if (this.state.inCart) {
            item.amount = this.props.cart.amount + this.state.amount;
            this.props.updateCartItem(this.props.user.id, item);
        } else {
            this.props.addCartItem(this.props.user.id, item);
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
                                value="Add Item"
                            />
                        </label>
                    </form></li>
                </ul>
            </li>
        );
    }
}

export default BuyerIndexItem;