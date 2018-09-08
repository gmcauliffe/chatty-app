import React, {Component} from 'react';


class Message extends Component {

  render() {
    let spanStyle = {
      color: this.props.usernameColor
    };

    if (this.props.type === 'incomingNotification') {
      return (
      <div className='message-system'>
        &#9742; &nbsp; &nbsp;  { this.props.content }
      </div>);      
    } else if (this.props.type === 'incomingMessage') {
      return (
        <div className='message'>
          <span className='message-username' style={ spanStyle }>{ this.props.username }</span>
          <span className='message-content'>{ this.props.content }</span>
        </div>);
    }
  }
}
export default Message;
