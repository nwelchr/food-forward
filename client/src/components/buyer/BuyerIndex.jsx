import React from "react";
import BuyerIndexItem from "./BuyerIndexItem";

class BuyerIndex extends React.Component {
    constructor(props) {
        super (props);
    }

    componentDidMount() {
        this.props.fetchNonprofitItems();
    }

    render() {
        let items = Object.values(this.props.items).map((item) => {
            return (
                <BuyerIndexItem key={`item-${item.id}`}
                item={item}
                cart={this.props.cart[item.id]} />
            );
        });

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