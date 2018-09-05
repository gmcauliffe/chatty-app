import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import data from '../data.json';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Franklin'},
      messages: data
    };

    // this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(content) {
    console.log(content);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
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
