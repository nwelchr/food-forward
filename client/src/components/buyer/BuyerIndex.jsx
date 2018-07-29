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

        let items = this.props.items ? Object.values(this.props.items).map((item) => {
            return (
                <BuyerIndexItem key={`item-${item._id}`}
                item={item}
                addCartItem={this.props.addCartItem}
                updateCartItem={this.props.updateCartItem}
                cart={this.props.cart[item._id]} 
                user={this.props.user}
                />
            );
        }) : '';


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