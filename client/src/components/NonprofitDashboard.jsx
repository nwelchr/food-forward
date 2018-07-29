import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

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
            modalType: ''
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
          modalType: ''
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
    console.log(item);
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

  renderModal() {
    return (
      <div className="item-modal-screen">
        <div className="product-image-upload">
          <h1>Photo:</h1>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <div className="drop-zone-instructions">
              <div>Add a Primary Photo</div>
              <div>Drop an image or click to select a file to upload.</div>
              <br />
              <i className="fa fa-camera" aria-hidden="true" />
            </div>
          </Dropzone>
          <div>
            <strong>OR</strong> paste an image URL:
            <input
              type="text"
              value={this.state.inputImageUrl}
              onChange={this.update('inputImageUrl')}
            />
          </div>

          {this.state.uploadImageUrl === '' ? null : (
            <div>
              <div className="image-upload">
                <img src={this.state.uploadImageUrl} />
                {this.props.formType === 'Create A Product' ? (
                  <div>{this.state.uploadedFile.name}</div>
                ) : null}
              </div>
              {this.state.image_url === '' ? null : (
                <div className="image-upload">
                  <div>
                    <img src={this.state.image_url} />
                  </div>
                  {this.props.formType === 'Create A Product' ? (
                    <div>{this.state.uploadedFile.name}</div>
                  ) : null}
                </div>
              )}
            </div>
          )}

          <form className="itemForm" onSubmit={this.handleSubmit}>
            <div className="ItemErros">Errors</div>
            <label>
              Item Name:
              <input
                className="search"
                type="text"
                onChange={this.update('name')}
                value={this.state.name}
              />
              <button onClick={this.search}>Find image</button>
            </label>

            <div>
              {this.state.previewImages &&
                this.state.previewImages.map(img => (
                  <img
                    onClick={() => this.setInputImage(img)}
                    style={{ width: 100 }}
                    src={img}
                  />
                ))}
            </div>

            <label>
              Quota :
              <input
                className="amount"
                type="number"
                onChange={this.update('quota')}
                value={this.state.quota}
              />
            </label>

            <label>
              Item price :
              <input
                className="amount"
                type="number"
                onChange={this.update('price')}
                value={this.state.price}
              />
            </label>

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
      <div>
        <nav>
          <div> Company Name </div>
        </nav>

        <button onClick={this.openModal}>Add Item</button>

        {this.state.modalType && this.renderModal()}

        <ItemIndex
          deleteNonprofitItem={this.props.deleteNonprofitItem}
          openUpdateModal={this.openUpdateModal}
          items={this.props.items}
        />
      </div>
    );
  }
}

export default NonprofitDashboard;
