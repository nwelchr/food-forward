import React from 'react';
import Dropzone from "react-dropzone";
import request from "superagent";

import itemsIndexComponent from './itemIndex';
const CLOUDINARY_UPLOAD_PRESET = "zfgcp1tk";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dwanjkcku/upload";


class Company extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      quota: '',
      image_url: '', 
      item_cost: ''
    };
  }

  // componentDidMount(){
  //   this.props.fetchItems();
  // }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateItem(this.state);
  }

  update(field) {
    return (e) => this.setState({
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
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          image_url: response.body.secure_url
        });
      }
    });
  }



  render(){
  //   if (Object.keys(this.props.items).length === 0) {
  //     return (
  //    <p>Loading...</p>
  //    );
  //  }
  //  const featuredItems = Object.values(this.props.items);
    return(
      <div>
        <nav>
          <div> Company Name </div>
          <div>  + </div>
        </nav>
          <div className="product-image-upload">
            <h1>Photo:</h1>
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}
            >
              <div className="drop-zone-instructions">
                <div>Add a Primary Photo</div>
                <div>Drop an image or click to select a file to upload.</div>
                <br />
                <i className="fa fa-camera" aria-hidden="true" />
              </div>
            </Dropzone>
            <div>
              {this.state.image_url === "" ? null : (
                <div className="image-upload">
                  <div>
                    <img src={this.state.image_url} />
                  </div>
                  {this.props.formType === "Create A Product" ? (
                    <div>{this.state.uploadedFile.name}</div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
         <form className='itemForm' onSubmit = {this.handleSubmit}>
           <div className='ItemErros'>
             Errors
           </div>
           <label>
             Item Name:
             <input
               className='search'
               type="text"
               onChange = {this.update('name')}/>
           </label>

           <label>
             Quota :
             <input
               className='amount'
               type="number"
               onCHange={this.update('quota')}/>
           </label>


           <input type='submit'/>
         </form>

        <itemsIndexComponent />

     </div>
   );
  }
}


export default Company;
