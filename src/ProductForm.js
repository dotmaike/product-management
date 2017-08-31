import React, { Component } from 'react';
import FB from './firebase.config';
import './ProductForm.css';

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
      errors: {}
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

  render() {
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Enter a new product</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" type="text" name="name" onChange={this.handleChange} value={this.state.product.name} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input className="form-control" type="text" name="category" onChange={this.handleChange} value={this.state.product.category} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <div className="input-group">
                <span className="input-group-addon">$</span>
                <input className="form-control" type="number" name="price" onChange={this.handleChange} value={this.state.product.price} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input className="form-control" type="date" name="date" onChange={this.handleChange} value={this.state.product.date} />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked} />
                In stock?
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;