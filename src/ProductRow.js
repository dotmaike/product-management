import React from 'react';

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isEditing: false,
      newName: props.product.name
    };
  }

  toggleState = () => {
  	this.setState((pstate) => ({
  		isEditing: !pstate.isEditing
  	}))
  }

  updateProduct = (e) => {
    e.preventDefault();
    this.props.editProduct(this.props.product.id, this.state.newName);

    this.setState({
      isEditing: false
    })
  }

  handleNameChange = (e) => {
    this.setState({
      newName: e.target.value
    })
  }

  destroy = () => {
    this.props.onDestroy(this.props.product.id);
  }

  toCurrency = (price) => (price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

  renderForm = () => (
  	<form onSubmit={this.updateProduct}>
      <input type="text" value={this.state.newName} onChange={this.handleNameChange} />
          <input type="text" defaultValue={this.props.product.price} />
          <input type="text" defaultValue={this.props.product.category} />
          <input type="date" defaultValue={this.props.product.date} />
      <button type="submit">Update</button>
	  </form>
  );

  renderItem = () => (
  	<tr>
        <td>{this.props.product.name}</td>
        <td>${this.toCurrency(this.props.product.price)}</td>
        <td>{this.props.product.category}</td>
        <td>{this.props.product.date}</td>
        <td><button onClick={this.destroy}>Delete</button></td>
        <td><button onClick={this.toggleState}>Edit</button></td>
    </tr>
  );

  render() {
    const {isEditing} = this.state;
    return (
     isEditing ? this.renderForm() : this.renderItem()
    );
  }
}

export default ProductRow;