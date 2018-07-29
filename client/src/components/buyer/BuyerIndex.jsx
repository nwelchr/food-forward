import React from "react";
import BuyerIndexItem from "./BuyerIndexItem";

class BuyerIndex extends React.Component {
    constructor(props) {
        super (props);
    }

    componentDidMount() {
        this.props.fetchNonprofitItems("5b5d085560cd313ab45be5a9");
    }

    render() {

        console.log("buyerindex", this.props);
        let items = this.props.items ? Object.values(this.props.items).map((item) => {
            return (
                <BuyerIndexItem key={`item-${item._id}`}
                item={item}
                addCartItem={this.props.addCartItem}
                updateCartItem={this.props.updateCartItem}
                cart={this.props.cart[item.id]} 
                user={this.props.user}
                />
            );
        }) : '';

        console.log('RENDERRRRR', this.props);

        return(
            <div>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

export default BuyerIndex;