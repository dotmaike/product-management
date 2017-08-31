import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

const Navbar = () => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <section className="container">
      <Header />
      <Navigation />
    </section>
  </nav>
);

export default Navbar;