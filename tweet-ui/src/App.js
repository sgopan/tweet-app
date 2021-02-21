import React, { Component } from 'react';
import TweetTable from './components/TweetTable.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    }
  }

  componentDidMount() {
        fetch('http://localhost:3002/api/tweets')
    .then(res => res.json())
    .then(tweets => this.setState({ 'tweets': tweets }));
  }

  render() {
    return (
      <div className="App">
        <TweetTable tweets={ this.state.tweets }/>
      </div>
    );
  }
}

export default App;
