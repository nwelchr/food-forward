import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import '../styles/nonprofit-dashboard.css';

import ItemIndex from './itemIndex';
const CLOUDINARY_UPLOAD_PRESET = 'zfgcp1tk';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwanjkcku/upload';

class NonprofitDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quota: '',
      uploadImageUrl: '',
      inputImageUrl: '',
      price: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.setInputImage = this.setInputImage.bind(this);
    this.openUpdateModal = this.openUpdateModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchNonprofitItems();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, quota, uploadImageUrl, inputImageUrl, price } = this.state;
    const image = uploadImageUrl || inputImageUrl;
    if (name && quota && price && image) {
      const item = {
        name,
        quota,
        price,
        image
      };
      const that = this;
      if (this.state.updateItemId) {
        const updateItem = { ...item, _id: this.state.updateItemId };
        return this.props.updateNonprofitItem(updateItem).then(() => {
          that.setState({
            name: '',
            uploadImageUrl: '',
            inputImageUrl: '',
            price: '',
            quota: '',
            updateItemId: '',
            modalType: '',
            previewImages: '',
            sortType: ''
          });
        });
      }
      this.props.createNonprofitItem(item).then(() =>
        that.setState({
          name: '',
          uploadImageUrl: '',
          inputImageUrl: '',
          price: '',
          quota: '',
          modalType: '',
          previewImages: '',
          sortType: ''
        })
      );
    }
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  setInputImage(image) {
    this.setState({
      inputImageUrl: image,
      previewImages: ''
    });
  }

  openUpdateModal(item) {
    const { name, quota, price, image: inputImageUrl, _id } = item;
    this.setState({
      modalType: 'update',
      name,
      quota,
      price,
      inputImageUrl,
      updateItemId: _id
    });
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadImageUrl: response.body.secure_url
        });
      }
    });
  }

  search(e) {
    e.preventDefault();
    if (!this.state.name) return;
    const searchterm = this.state.name.split(' ').join('+');
    const scraper = async () => {
      const previewImages = [];
      try {
        const response = await fetch(
          'https://www.googleapis.com/customsearch/v1?key=AIzaSyCx-iBb8GzDm7rJFpaubVGzZO4aPCX8sq0&cx=012673512427264311483:ortifcx9wgi&q=' +
            searchterm +
            '&searchType=image'
        );
        const image = await response.json();
        for (let i = 0; i < 3; i++) {
          previewImages.push(image.items[i].link);
        }
      } catch (error) {
        console.log(error);
      }

      this.setState({ previewImages });
    };

    scraper();
  }

  closeModal() {
    this.setState({
      modalType: '',
      name: '',
      uploadImageUrl: '',
      inputImageUrl: '',
      price: '',
      quota: '',
      updateItemId: '',
      modalType: '',
      previewImages: ''
    });
  }

  updateSort(field) {
    return e => {
      e.preventDefault();
      this.setState({ sortType: field });
    };
  }

  renderModal() {
    return (
      <div className="item-modal-screen">
        <div className="item-modal">
          <img
            onClick={this.closeModal}
            className="close-btn"
            src="https://res.cloudinary.com/dwanjkcku/image/upload/v1532872677/fkd0pfutax6wvecukx6d.png"
          />
          <div className="add-image">
            <div
              className="dropzone-container"
              style={{
                backgroundImage: `url('${this.state.uploadImageUrl}')`,
                width: 80,
                height: 80,
                borderRadius: 10,
                backgroundSize: 80,
                opacity: 0.9
              }}>
              <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p className="drop-zone-instructions">+</p>
              </Dropzone>
            </div>
            <div className="paste-url">
              <p>Or paste an image URL:</p>
              <input
                type="text"
                value={this.state.inputImageUrl}
                onChange={this.update('inputImageUrl')}
                placeholder="http://www.google.com/the_most_amazing_image_ever.png"
              />
            </div>
          </div>
          <form className="item-form" onSubmit={this.handleSubmit}>
            <input
              className="search"
              type="text"
              onChange={this.update('name')}
              value={this.state.name}
              placeholder="Item name"
            />

            <div className="preview-image-wrapper">
              {this.state.previewImages ? (
                <div className="preview-images">
                  {this.state.previewImages.map(img => (
                    <img
                      onClick={() => this.setInputImage(img)}
                      className="one"
                      style={{ width: 100 }}
                      src={img}
                    />
                  ))}
                </div>
              ) : (
                <Fragment>
                  <button className="find-image-btn" onClick={this.search}>
                    Find image
                  </button>
                  <div className="preview-image-placeholder" />
                </Fragment>
              )}
            </div>

            <input
              className="amount"
              type="number"
              onChange={this.update('quota')}
              value={this.state.quota}
              placeholder="Quota ($)"
            />

            <input
              className="amount"
              type="number"
              onChange={this.update('price')}
              value={this.state.price}
              placeholder="Price per item ($)"
            />

            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }

  openModal() {
    this.setState({ modalType: 'create' });
  }

  render() {
    return (
      <div className="body-wrapper">
        <div className="non-profit-dashboard">
          <nav className="non-profit-nav">
            <p>Hello, {this.props.displayName}!</p>
            <div className="button-nav">
              <button className="change-item-button add">
                <a className="logout-btn" href="/auth/logout">
                  Logout
                </a>
              </button>
              <button
                className="change-item-button add"
                onClick={this.openModal}>
                Add Item
              </button>
            </div>
          </nav>

          <main className="main-content">
            <section className="toggle-options">
              <button
                onClick={this.updateSort('time-lh')}
                className={`change-item-button add ${
                  this.state.sortType === 'time-lh' ? 'selected' : ''
                }`}>
                Time ↑
              </button>
              <button
                onClick={this.updateSort('time-hl')}
                className={`change-item-button add ${
                  this.state.sortType === 'time-hl' ? 'selected' : ''
                }`}>
                Time ↓
              </button>
              <button
                onClick={this.updateSort('abc-lh')}
                className={`change-item-button add ${
                  this.state.sortType === 'abc-lh' ? 'selected' : ''
                }`}>
                ABC ↑
              </button>
              <button
                onClick={this.updateSort('abc-hl')}
                className={`change-item-button add ${
                  this.state.sortType === 'abc-hl' ? 'selected' : ''
                }`}>
                ABC ↓
              </button>
              <button
                onClick={this.updateSort('quota-lh')}
                className={`change-item-button add ${
                  this.state.sortType === 'quota-lh' ? 'selected' : ''
                }`}>
                Quota ↑
              </button>
              <button
                onClick={this.updateSort('quota-hl')}
                className={`change-item-button add ${
                  this.state.sortType === 'quota-hl' ? 'selected' : ''
                }`}>
                Quota ↓
              </button>
              <button
                onClick={this.updateSort('remaining-lh')}
                className={`change-item-button add ${
                  this.state.sortType === 'remaining-lh' ? 'selected' : ''
                }`}>
                Remaining ↑
              </button>
              <button
                onClick={this.updateSort('remaining-hl')}
                className={`change-item-button add ${
                  this.state.sortType === 'remaining-hl' ? 'selected' : ''
                }`}>
                Remaining ↓
              </button>
            </section>

            <ItemIndex
              sortType={this.state.sortType}
              deleteNonprofitItem={this.props.deleteNonprofitItem}
              openUpdateModal={this.openUpdateModal}
              items={this.props.items}
            />
          </main>
          {this.state.modalType && this.renderModal()}
        </div>
      </div>
    );
  }
}

export default NonprofitDashboard;
