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
    this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
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
  
  onKeyPressHandler(event) {
    if (event.key === 'Enter'){
      this.props.onNewPost(this.state);
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
          placeholder={ this.props.currentUser } />
        <input
          id="chatbar-message"
          className="chatbar-message" 
          value={ this.state.content } 
          onChange={ this.onContent } 
          onKeyPress={ this.onKeyPressHandler } 
          placeholder="Type a message and hit ENTER" />
        <section>
          <Statusbar count={ this.state.content.length } max={ 140 } />
        </section>
      </footer>
    );
  }
}
export default Chatbar;
