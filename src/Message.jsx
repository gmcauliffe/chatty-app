import React, {Component} from 'react';


class Message extends Component {
  
  render() {
    if (this.props.type === 'incomingMessage') {
      return (
        <div className='message' key={ this.props.key }>
          <span className='message-username'>{ this.props.username }</span>
          <span className='message-content'>{ this.props.content }</span>
        </div>);
    } else {
      return (
      <div className='message system' key={ this.props.key }>
        { this.props.content }
      </div>);
    }
  }
}
export default Message;
