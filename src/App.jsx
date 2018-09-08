import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: '',
        color: ''},
      messages: [],
      userCount: ''
    };

    this._handleSocketMessage = this._handleSocketMessage.bind(this);
    this._onNewPost = this._onNewPost.bind(this);
    this._onNewUsername = this._onNewUsername.bind(this);
  }

  componentDidMount() {
    // Connect to our WebSocket server.
    this.socket = new WebSocket('ws://localhost:3001/');
    
    // Small helper to make sending JSON objects easier.
    this.socket.sendJson = obj => this.socket.send(JSON.stringify(obj));

    // OnOpen event handler, tells us the socket is open.
    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // OnMessage event handler, using a function on the class to handle this so
    // our code stays consise
    this.socket.onmessage = (event) => {
      // Message data is serialized as JSON, parse it.
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'incomingMessage':
          // handle incoming message
          this._handleSocketMessage(data);
          break;
        case 'incomingNotification':
          // handle incoming message
          this._handleSocketMessage(data);
          break;
        case 'userJoin':
          // handle incoming notification
          this._handleUserJoin(data);
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type + data);
      }     
    }
  }

  render() {
    return (
      <div>
        <Navbar userCount={ this.state.userCount }/>
        <MessageList 
          messages={ this.state.messages }
          color={ this.state.currentUser.color }/>
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
    // Store the received message in our message list.
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.concat(message)
    }));

  };

  _handleUserJoin(userJoin) {
    if (!this.state.currentUser.name) {
      this.setState({
        userCount: [userJoin.content]
      })
    } else {
      this.setState({
        currentUser: {
          name: userJoin.name, 
          color: userJoin.color
        },
        userCount: [userJoin.content]
      })
    }
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
      username: this.state.currentUser.name,
      usernameColor: this.state.currentUser.color
    }
    // Send the msg object as a JSON-formatted string.
    this.socket.sendJson(newMessage);
  }
}


export default App;
