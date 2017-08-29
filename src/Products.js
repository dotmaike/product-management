import React, { Component } from 'react';
import Filters from './Filters.js';
import ProductTable from './ProductTable.js';
import ProductForm from './ProductForm';
//import ProductRow from './ProductRow';
import clone from 'lodash/clone';

var PRODUCTS = {
  '1': {id: 1, category: 'Musical Instruments', price: '$459.99', stocked: true, name: 'Clarinet', date:'01-01-2000'},
  '2': {id: 2, category: 'Musical Instruments', price: '$5,000', stocked: true, name: 'Harpsicord' , date:'01-01-2000'},
  '3': {id: 3, category: 'Musical Instruments', price: '$11,000', stocked: false, name: 'Fortepiano', date:'01-01-2000'},
  '4': {id: 4, category: 'Furniture', price: '$799', stocked: true, name: 'Chaise Lounge', date:'01-01-2000'},
  '5': {id: 5, category: 'Furniture', price: '$1,300', stocked: false, name: 'Dining Table', date:'01-01-2000'},
  '6': {id: 6, category: 'Furniture', price: '$100', stocked: true, name: 'Bean Bag', date:'01-01-2000'}
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      products: PRODUCTS
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
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