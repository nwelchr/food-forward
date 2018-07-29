import React from "react";
import ItemIndexItem from "./itemIndexItem";

class ItemIndex extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        let items = Object.values(this.props.items).map((item) => {
            return (
                <ItemIndexItem key={`item-${item.id}`}
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

export default ItemIndex;