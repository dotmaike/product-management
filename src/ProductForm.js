import React, { Component } from 'react';
import FB from './firebase.config';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: '',
        category: '',
        price: '',
        stocked: false,
        name: '',
        date: ''
      },
      errors: {},
      showingAddForm: false
    };
  }

  getGuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const product = Object.assign({}, this.state.product);
    product[name] = value;
    product.id = this.getGuid();
    this.setState(state => ({ ...state, product }));
  }

  handleSave = () => {
    const db = FB.database();
    const rootRef = db.ref().child('products');
    rootRef.push(this.state.product);
  }

  toggleAddForm = () => {
    this.setState((pstate) => ({
      showingAddForm: !pstate.showingAddForm
    }))
  }

  add = () => (
    <form>
      <h3>Enter a new product</h3>
      <p>
        <label>
          Name
            <br />
          <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} required />
        </label>
      </p>
      <p>
        <label>
          Category
            <br />
          <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} required />
        </label>
      </p>
      <p>
        <label>
          Price
            <br />
          <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} required />
        </label>
      </p>
      <p>
        <label>
          Date
            <br />
          <input type="date" name="date" onChange={this.handleChange} value={this.state.product.date} />
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked} />
          &nbsp;In stock?
          </label>
      </p>
      <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
    </form>
  );

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.toggleAddForm}>Add</button>
        {this.state.showingAddForm && this.add()}
      </div>
    );
  }
}

export default ProductForm;