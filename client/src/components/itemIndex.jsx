import React from 'react';
import ItemIndexItem from './itemIndexItem';

class ItemIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = Object.values(this.props.items).map(item => {
      return (
        <ItemIndexItem
          openUpdateModal={this.props.openUpdateModal}
          deleteNonprofitItem={this.props.deleteNonprofitItem}
          key={`item-${item._id}`}
          item={item}
        />
      );
    });

    return (
      <div>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default ItemIndex;
