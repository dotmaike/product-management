import React from "react";
import FB from './firebase.config';

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: props.product.name
    };
  }

  toggleState = () => {
    this.setState(state => ({
      ...state,
      isEditing: !state.isEditing
    }));
  };

  updateProduct = () => {
    const { id } = this.props.product;
    const { newName, newCategory, newPrice, newDate } = this.state;
    const db = FB.database();
    const rootRef = db.ref().child('products');
    console.log(id.toString());
    rootRef.child(id.toString())
      .update({
        name: newName,
        category: newCategory,
        price: newPrice,
        date: newDate
      })
      .then(res => {
        this.toggleState();
        return {};
      })
      .catch(error => {
        return {
          errorCode: error.code,
          errorMessage: error.message
        };
      });
  };

  handleNameChange = e => {
    this.setState({
      newName: e.target.value
    });
  };

  destroy = () => {
    this.props.onDestroy(this.props.product.id);
  };

  toCurrency = price =>
    price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  renderForm = () => (
    <form>
      <input
        type="text"
        value={this.state.newName}
        onChange={this.handleNameChange}
      />
      <input type="text" defaultValue={this.props.product.price} />
      <input type="text" defaultValue={this.props.product.category} />
      <input type="date" defaultValue={this.props.product.date} />
      <button onClick={this.updateProduct} type="button">Update</button>
    </form>
  );

  renderItem = () => (
    <tr>
      <td>{this.props.product.name}</td>
      <td>${this.toCurrency(this.props.product.price)}</td>
      <td>{this.props.product.category}</td>
      <td>{this.props.product.date}</td>
      <td>
        <button onClick={this.destroy}>Delete</button>
      </td>
      <td>
        <button onClick={this.toggleState}>Edit</button>
      </td>
    </tr>
  );

  render() {
    const { isEditing } = this.state;
    return isEditing ? this.renderForm() : this.renderItem();
  }
}

export default ProductRow;
