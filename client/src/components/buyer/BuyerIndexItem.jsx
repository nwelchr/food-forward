import React from "react";

class BuyerIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inCart: Boolean(this.props.cart),
            amount: 0 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    update(field) {
        return e => {
          this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let item = {
            nonprofitId: "5b5d085560cd313ab45be5a9", 
            amount: this.state.amount,
            _id: this.props.item._id,
        };

        console.log('Generated Item', item);
        if (this.state.inCart) {
            item.amount = this.props.cart.amount + this.state.amount;
            this.props.updateCartItem(this.props.user._id, item);
        } else {
            this.props.addCartItem(this.props.user._id, item);
        }

        this.setState({amount: 0});
    }

    render() {
        console.log('itemState', this.state);
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