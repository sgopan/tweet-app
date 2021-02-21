import React, { Component } from 'react';
import moment from 'moment';

class TweetTable extends Component {
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
        const {tweets} = this.state;
        return ( 
            <div style={{ margin:"20px" }}>
            <h1 class="text-center">Tweet Table</h1>
            <table className="table table-striped" style={{ border:"1px solid #ddd" }}>
      <thead  style={{ backgroundColor:"#ADD8E6" }}>
        <tr>
          <th>Tweet Id</th>
          <th>Tweet</th>
          <th>User Id</th>
          <th>User Name</th>
          <th>Tweeted At</th>
        </tr>
      </thead>
      <tbody>
         { (tweets.length > 0) ? tweets.map( (tweet, index) => {
           return (
            <tr key={ index }>
              <td>{ tweet.tweet_id }</td>
              <td>{ tweet.tweet_message }</td>
              <td>{ tweet.user_id}</td>
              <td>{ tweet.user_name }</td>
              <td>{moment(tweet.createdAt).format('MMMM Do YYYY')}</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>   
    </div>   
        );
      }
}


export default TweetTable