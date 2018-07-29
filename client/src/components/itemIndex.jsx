import React from 'react';
import ItemIndexItem from './itemIndexItem';

class ItemIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = Object.values(this.props.items);

    switch (this.props.sortType) {
      case 'time-lh':
        items = items.sort((a, b) => a.createdAt > b.createdAt);
        break;
      case 'time-hl':
        items = items.sort((a, b) => a.createdAt < b.createdAt);
        break;
      case 'abc-lh':
        items = items.sort(
          (a, b) => a.name.toLowerCase() < b.name.toLowerCase()
        );
        break;
      case 'abc-hl':
        items = items.sort(
          (a, b) => a.name.toLowerCase() > b.name.toLowerCase()
        );
        break;
      case 'quota-lh':
        items = items.sort((a, b) => Number(a.quota) > Number(b.quota));
        break;
      case 'quota-hl':
        items = items.sort((a, b) => Number(a.quota) < Number(b.quota));
        break;
      case 'remaining-lh':
        items = items.sort(
          (a, b) =>
            Number(a.quota - a.amtRaised) < Number(b.quota - b.amtRaised)
        );
        break;
      case 'remaining-hl':
        items = items.sort(
          (a, b) =>
            Number(a.quota - a.amtRaised) > Number(b.quota - b.amtRaised)
        );
        break;
      default:
        break;
    }

    items = items.reverse().map(item => {
      return (
        <ItemIndexItem
          openUpdateModal={this.props.openUpdateModal}
          deleteNonprofitItem={this.props.deleteNonprofitItem}
          key={`item-${item._id}`}
          item={item}
        />
      );
    });

    return <ul className="item-index-ul">{items}</ul>;
  }
}

export default ItemIndex;
