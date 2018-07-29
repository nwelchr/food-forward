import React from "react";
import BuyerIndexItem from "./BuyerIndexItem";

class BuyerItem extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        let items = Object.values(this.props.items).map((item) => {
            return (
                <BuyerIndexItem key={`item-${item.id}`}
                item={item} />
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

export default BuyerItem;