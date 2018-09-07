import React, {Component} from 'react';


class Navbar extends Component {
  
  render() {
    return (
      <nav className="navbar">
          <a href="/" className="navbar-brand">&#9742; Chatty</a>
          <span className="navbar-count">{this.props.userCount}</span>
      </nav>
    );
  }
}
export default Navbar;