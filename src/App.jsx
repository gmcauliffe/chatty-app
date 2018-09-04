import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
/* import data from '../data.json'; */

class App extends Component {
  render() {
    return (
      <div>
        <MessageList />
        <Chatbar /> 
      </div>
    );
  }
}
export default App;
