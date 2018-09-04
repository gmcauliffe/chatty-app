import React, {Component} from 'react';

// function UsernamePlaceholder({ currentUser }) {
//   return (
//     <input className="chatbar-username" placeholder={ currentUser } />
//   )
// }

class Chatbar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;
