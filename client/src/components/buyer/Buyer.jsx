import React from 'react';
import BuyerIndexContainer from "./BuyerIndexContainer";

class Buyer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCart();
    }

    render() {
        return(
            <div>
                HELLO
            </div>
        );
    }
}

export default Buyer;