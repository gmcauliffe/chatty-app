import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import data from '../data.json';

function generateRandomString() {
  let text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Franklin'},
      messages: data
    };

    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(newPost) {
    const randomId = generateRandomString();
    const newMessage = {
      id: randomId,
      type: 'incomingMessage',
      content: newPost.content,
      username: newPost.username,
      time: Date.now()
    }
    this.setState({ messages: [...this.state.messages, newMessage]})
  }

  componentDidMount() {
     // Connect to our WebSocket server.
    // Storing the socket into a property on the App component to be used in
    // other functions
    this.socket = new WebSocket('ws://localhost:3001/');

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
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={ this.state.currentUser.name } onNewPost={ this.onNewPost }/> 
      </div>
    );
  }

    /**
   * Socket Message Event Handler
   * @param {MessageEvent} message The MessageEvent object, this contains the data we've received from the server.
   */
  _handleSocketMessage = message => {
    // Message data is serialized as JSON, parse it.
    const json = JSON.parse(message.data);
    console.log('Got message', json);

    // Store the received message in our message list.
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.concat(json)
    }));
  };
}




export default App;
