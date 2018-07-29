import React from 'react';

import itemsIndexComponent from './itemIndex';

class Company extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      quota: '',
    };
  }

  componentDidMount(){
    this.props.fetchItems();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateItem(this.state);
  }

  update(field) {
  return (e) => this.setState({
    [field]: e.currentTarget.value
  });
}

  render(){
    if (Object.keys(this.props.items).length === 0) {
      return (
     <p>Loading...</p>
     );
   }
   const featuredItems = Object.values(this.props.items);
    return(
     <div>
       <nav>
         <div> Company Name </div>
         <div>  + </div>
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
      </nav>

      <itemsIndexComponent />

     </div>
   );
  }
}


export default Company;
