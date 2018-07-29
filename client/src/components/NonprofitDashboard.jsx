import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import ItemIndex from './itemIndex';
const CLOUDINARY_UPLOAD_PRESET = 'zfgcp1tk';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwanjkcku/upload';

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quota: '',
      uploadImageUrl: '',
      inputImageUrl: '',
      cost: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchNonprofitItems();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, quota, uploadImageUrl, inputImageUrl, cost } = this.state;
    const image = uploadImageUrl || inputImageUrl;
    if (name && quota && cost && image) {
      const item = {
        name,
        quota,
        cost,
        image
      };
      const that = this;
      this.props.createNonprofitItem(item).then(() =>
        that.setState({
          name: '',
          uploadImageUrl: '',
          inputImageUrl: '',
          cost: '',
          quota: ''
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

  render() {
    console.log(this.state, 'NEW STATE!');
    return (
      <div>
        <nav>
          <div> Company Name </div>
          <div> + </div>
        </nav>
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
          <div>
            {this.state.uploadImageUrl === '' ? null : (
              <div className="image-upload">
                <div>
                  <img src={this.state.uploadImageUrl} />
                </div>
                {this.props.formType === 'Create A Product' ? (
                  <div>{this.state.uploadedFile.name}</div>
                ) : null}
              </div>
            )}
          </div>
        </div>
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
          </label>

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
            Item Cost :
            <input
              className="amount"
              type="number"
              onChange={this.update('cost')}
              value={this.state.cost}
            />
          </label>

          <input type="submit" />
        </form>

        <ItemIndex
          deleteNonprofitItem={this.props.deleteNonprofitItem}
          items={this.props.items}
        />
      </div>
    );
  }
}

export default Company;
