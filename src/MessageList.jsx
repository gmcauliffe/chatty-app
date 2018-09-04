import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return <Message 
        type={ message.type }
        content={ message.content }
        username={ message.username } />
    })

    
    return (
      <main className="messages">
        { messages }
      </main>  
    );
  }
}
export default MessageList;
