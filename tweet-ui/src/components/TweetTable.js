import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class TweetTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    }
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_TWEET_API_URL)
      .then(tweets => this.setState({ 'tweets': tweets.data }));
  }

  render() {
    const { tweets } = this.state;
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Tweet Demo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar>
        <Table striped bordered hover responsive="lg">
          <thead>
            <tr>
              <th >Tweet Id</th>
              <th >Tweet</th>
              <th >User Id</th>
              <th >User Name</th>
              <th >Tweeted At</th>
            </tr>
          </thead>
          <tbody>
             {(tweets.length > 0) ? tweets.map((tweet, index) => {
               return (
                 <tr key={index}>
                   <td>{tweet.tweet_id}</td>
                   <td>{tweet.tweet_message}</td>
                   <td>{tweet.user_id}</td>
                   <td>{tweet.user_name}</td>
                   <td>{moment(tweet.tweeted_at).format('MMMM Do YYYY')}</td>
                 </tr>
               )
             }) : <tr><td colSpan="5">Loading...</td></tr>}
           </tbody>
        </Table>
      </div>
      /* <div style={{ margin: "20px" }}>
         <h1 className="text-center">Tweet Table</h1>
         <table className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
           <thead style={{ backgroundColor: "#ADD8E6" }}>
             <tr>
               <th className="th-sm">Tweet Id</th>
               <th className="th-sm">Tweet</th>
               <th className="th-sm">User Id</th>
               <th className="th-sm">User Name</th>
               <th className="th-sm">Tweeted At</th>
             </tr>
           </thead>
           <tbody>
             {(tweets.length > 0) ? tweets.map((tweet, index) => {
               return (
                 <tr key={index}>
                   <td>{tweet.tweet_id}</td>
                   <td>{tweet.tweet_message}</td>
                   <td>{tweet.user_id}</td>
                   <td>{tweet.user_name}</td>
                   <td>{moment(tweet.tweeted_at).format('MMMM Do YYYY')}</td>
                 </tr>
               )
             }) : <tr><td colSpan="5">Loading...</td></tr>}
           </tbody>
         </table>
       </div>*/
    );
  }
}


export default TweetTable