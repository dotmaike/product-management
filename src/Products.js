import React, { Component } from 'react';
import Filters from './Filters.js';
import ProductTable from './ProductTable.js';
import ProductForm from './ProductForm';
//import ProductRow from './ProductRow';
import clone from 'lodash/clone';
import FB from './firebase.config';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      products: {}
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentWillMount() {
    const db  = FB.database();
    const rootRef = db.ref().child('products');
    rootRef.on('value', snap => {
      this.setState(state => ({ ...state, products: snap.val() }));
    });
  }

  handleFilter(filterInput) {
    this.setState(filterInput);
  }
  saveProduct(product) {
    if (!product.id) {
      product.id = new Date().getTime();
    }
    this.setState((prevState) => {
      let products = prevState.products;
      products[product.id] = product;
      return { products };
    });
  }

  updateProduct(newValue){
    this.setState({
      currentProduct:newValue.target.value,
    });
  }

  editProduct(id, newName, newPrice, newCategory, newDate){
    this.setState((pstate) => {
      const copiedProducts = clone(pstate.products);
      copiedProducts[id]['name'] = newName;
      copiedProducts[id]['price'] = newPrice;
      copiedProducts[id]['category'] = newCategory;
      copiedProducts[id]['date']= newDate;
      return {
        products: copiedProducts
      }
    })
  }

  handleDestroy(productId) {
    this.setState((prevState) => {
      let products = prevState.products;
      delete products[productId];
      return { products };
    });
  }

  render() {
    return (
      <div>
        <Filters
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilter={this.handleFilter}
        ></Filters>
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onDestroy={this.handleDestroy}
          editProduct={this.editProduct}
        ></ProductTable>
        <ProductForm onSave={this.saveProduct} ></ProductForm>
      </div>
    );
  }
}

export default Products;