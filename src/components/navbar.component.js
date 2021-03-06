import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-info navbar-expand-lg py-3">
        <Link to="/" className="navbar-brand">Crypto Portfolio Tracker</Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {/* <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li> */}
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add To Portfolio</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Add New Cryptocurrency</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}