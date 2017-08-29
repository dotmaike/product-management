import React from 'react';

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    
    this.destroy = this.destroy.bind(this);
    this.state = { isEditing: false };
    this.renderForm = this.renderForm.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    
    this.handleNameChange = this.handleNameChange.bind(this);
    
    this.state ={
      newName: this.props.product.name
    };
  }

  toggleState(){
  	this.setState((pstate) => ({
  		isEditing: !pstate.isEditing
  	}))
  }

  updateProduct(evt){
    evt.preventDefault();
    this.props.editProduct(this.props.product.id, this.state.newName);
    
    this.setState({
      isEditing: false
    })
  }
  
  handleNameChange(event) {
    this.setState({
      newName: event.target.value
    })
  }

  renderForm(){
  	return(
  	<form onSubmit={this.updateProduct}>
		<input type="text" value={this.state.newName} onChange={this.handleNameChange} />
        <input type="text" defaultValue={this.props.product.price} />
        <input type="text" defaultValue={this.props.product.category} />
        <input type="date" defaultValue={this.props.product.date} />
		<button type="submit">Update</button>
	  </form>
	  )
  }

  renderItem(){
  	return (
  	<tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.category}</td>
        <td>{this.props.product.date}</td>
        <td><button onClick={this.destroy}>Delete</button></td>
        <td><button onClick={this.toggleState}>Edit</button></td>
    </tr>
  )}
  
  destroy() {
    this.props.onDestroy(this.props.product.id);
  }

  render() {
    const {isEditing} = this.state;
    return (
     isEditing ? this.renderForm() : this.renderItem()
    );
  }
}

export default ProductRow;