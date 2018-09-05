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
      username: newPost.username
    }
    this.setState({ messages: [...this.state.messages, newMessage]})
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      const newMessage = {id: '8abc', type: 'incomingMessage', content: 'Hello there!', username: 'Michelle'};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={ this.state.currentUser.name } onNewPost={ this.onNewPost }/> 
      </div>
    );
  }
}
export default App;
