import React, {Component} from 'react';
import Statusbar from './Statusbar.jsx';
// function UsernamePlaceholder({ currentUser }) {
//   return (
//     <input className="chatbar-username" placeholder={ currentUser } />
//   )
// }

class Chatbar extends Component {

  constructor() {
    super();

    this.state = {
      content: '',
      username: '',
      error: ''
    }

    this.onContent = this.onContent.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.onKeyPressContent = this.onKeyPressContent.bind(this);
    this.onKeyPressName = this.onKeyPressName.bind(this);
  }

  onUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }
  
  onKeyPressContent(event) {
    if (event.key === 'Enter'){
      this.props.onNewPost(this.state);
    }
  }

  onKeyPressName(event) {
    if (event.key === 'Enter'){
      this.props.onNewUsername(this.state);
    }
  }
  

  render() {
    return (
      <footer className="chatbar" >
        <input
          id="chatbar-username"
          className="chatbar-username" 
          value={ this.state.username } 
          onChange={ this.onUsername } 
          onKeyPress={ this.onKeyPressName } 
          placeholder='Username' />
        <input
          id="chatbar-message"
          className="chatbar-message" 
          value={ this.state.content } 
          onChange={ this.onContent } 
          onKeyPress={ this.onKeyPressContent } 
          placeholder="Type a message and hit ENTER" />
        <section>
          <Statusbar count={ this.state.content.length } max={ 140 } />
        </section>
      </footer>
    );
  }
}
export default Chatbar;
