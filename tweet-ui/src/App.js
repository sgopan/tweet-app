import React, { Component } from 'react';
import TweetTable from './components/TweetTable.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <TweetTable/>
      </div>
    );
  }
}

export default App;
