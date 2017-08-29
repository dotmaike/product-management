import React, { Component } from 'react';
import Products from './Products.js';
//import Center from 'react-center';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
      	<center>
        <header className="App-header"><h1>Products Management</h1></header>
        </center>
        <section>
        <center>
          <Products></Products>
         </center>
        </section>
      </div>
    );
  }
}

export default App;