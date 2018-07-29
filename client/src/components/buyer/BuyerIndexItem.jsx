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
        this.increase = this.increase.bind(this); 
    }

    update(field) {
        return e => {
          this.setState({ [field]: e.target.value });
        };
    }

    increase(field) {
        let newAmount = this.state.amount + 1; 
        this.setState({ [field]: newAmount});
    }

    handleSubmit(e) {
        e.preventDefault();
        let item = {
            nonprofitId: "5b5d085560cd313ab45be5a9", 
            amount: this.state.amount,
            _id: this.props.item._id,
        };
        if (this.state.inCart) {
            item.amount = this.props.cart.amount + this.state.amount;
            this.props.updateCartItem(this.props.user._id, item);
        } else {
            this.props.addCartItem(this.props.user._id, item);
        }

        this.setState({amount: 0});
    }

    render() {
        return(
            <li className="buyer-index-item">
                <img className="itemImage" src={this.props.item.image} />
                <p className="itemPrice">${this.props.item.price}</p>
                <p className="itemName">{this.props.item.name}</p>
                <div onClick={() => this.increase("amount")} className="addItemBtn">
                    <p>Add Item</p>
                    <div className="AddQ">{this.state.amount}</div>
                </div> 
                <form className="hideme" onSubmit={this.handleSubmit}>
                    <label>
                        Quantity: 
                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={this.state.amount}
                            placeholder="Quantity"
                            onChange={this.update("amount")}
                        />
                        <input
                            type="submit"
                            value="Add Item"
                        />
                    </label>
                </form>
            </li>
        );
    }
}

export default BuyerIndexItem;