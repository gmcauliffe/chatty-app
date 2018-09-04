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
  }


  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={ this.state.currentUser.name }/> 
      </div>
    );
  }
}
export default App;
