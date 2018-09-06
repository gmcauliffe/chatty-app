import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

function generateAnonymous() {
  let text = 'Anonymous';
  var possible = '0123456789';
  for (var i = 0; i < 2; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ''},
      messages: []
    };

    this._handleSocketMessage = this._handleSocketMessage.bind(this);
    this._onNewPost = this._onNewPost.bind(this);
    this._onNewUsername = this._onNewUsername.bind(this);
  }

  componentDidMount() {
    // Connect to our WebSocket server.
    this.socket = new WebSocket('ws://localhost:3001/');
    
    let anon = generateAnonymous();
    this.setState({currentUser: {name: anon}})
    
    // Small helper to make sending JSON objects easier.
    this.socket.sendJson = obj => this.socket.send(JSON.stringify(obj));

    // OnOpen event handler, tells us the socket is open.
    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // OnMessage event handler, using a function on the class to handle this so
    // our code stays consise
    this.socket.onmessage = this._handleSocketMessage;
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages }/>
        <Chatbar 
          currentUser={ this.state.currentUser.name } 
          onNewPost={ this._onNewPost }
          onNewUsername={ this._onNewUsername }/> 
      </div>
    );
  }

    /**
   * Socket Message Event Handler
   * @param {MessageEvent} message The MessageEvent object, this contains the data we've received from the server.
   */
  _handleSocketMessage(message) {
    // Message data is serialized as JSON, parse it.
    const json = JSON.parse(message.data);
    console.log('Got message', json);

    // Store the received message in our message list.
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.concat(json)
    }));
  };

  _onNewUsername(newUsername) {
    const currentUser = this.state.currentUser;
    console.log("currentUser= ", currentUser);
    const newNotification = {
      type: 'postNotification',
      content: `${currentUser.name} changed their name to ${newUsername.username}`
    }
    this.setState({currentUser: {name: newUsername.username}})
    // Send the msg object as a JSON-formatted string.
    this.socket.sendJson(newNotification);
  }

  _onNewPost(newPost) {
    const newMessage = {
      type: 'postMessage',
      content: newPost.content,
      username: this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous'
    }

    // Send the msg object as a JSON-formatted string.
    this.socket.sendJson(newMessage);
  }
}




export default App;
