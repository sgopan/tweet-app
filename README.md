# Tweet App


# Introduction

The tweet application was developed to read all the tweets matching particular hashtag this particular case #liveperson from twitter and syncs these to a database(SQLIte). While syncing to the database the application needs to check if there are duplicates before the tweet is written to a database. The tweets stored in the database are the displayed in a user interface 


## Code

https://github.com/sgopan/tweet-app


# Design

The tweet app essentially  was designed on the principles microservices namely independent, loosely coupled and single responsibility etc except that it shares a common database. The entire application consists of three independently deployable components namely



1. Tweet Reader
2. Tweet API
3. Tweet UI

The figure depicts how these high level design and how the different components fits together to achieve the functionality



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.jpg "image_tooltip")



## Twitter Reader

The twitter reader is a node express application. On Startup the twitter reader application will search for tweets with #liveperson. Once read the tweets are transformed to a json format compatible with the database model. The writer components check if the table already exists and create a table for tweets and starts inserting the tweets one by one into the SQLIte Database. The duplicate check on the tweets is done by the tweet_id. If the ids are the same(record  is database vs record from twitter) then tweet is considered a duplicate one and ignored.


### Design Decisions


<table>
  <tr>
   <td><strong>Area</strong>
   </td>
   <td><strong>Decision</strong>
   </td>
   <td><strong>Alternatives</strong>
   </td>
   <td><strong>Rationale</strong>
   </td>
  </tr>
  <tr>
   <td>Twitter Search API version 
   </td>
   <td>API V2 for Standard Search
   </td>
   <td>API V1.1 for Standard Search
   </td>
   <td>Use Latest version of the API.
   </td>
  </tr>
  <tr>
   <td>Recent vs Full Archive search API
   </td>
   <td>Recent  standard API
   </td>
   <td>Archive search API
<p>
Premium and Enterprise API
   </td>
   <td>Archive search API requires approval from twitter and can only be used for academic search. Premium and Enterprise API are paid.  Hence Recent search API v2 recent is used
   </td>
  </tr>
</table>



### Node packages 

Express - web framework

Sequelize - ORM framework

Axios - http client to call twitter API


### Tech Debt/Enhancements



*   Since the recent search API is used its retrieves the tweets for last 7 days and is a limitation of the API and since access to Archive search API was not there the code could not be tested with that
*   Ability to sync new tweets in realtime to the database when someone creates new  tweets based on a hashtag can be implemented using twitter search stream api. This can be taken as an enhancement.


### How to run?



1. Go to [https://github.com/sgopan/tweet-app](https://github.com/sgopan/tweet-app)
2. Clone the project to local directory using 

    git clone https://github.com/sgopan/tweet-app.git

3. Create a twitter developer account and register an application
4. For the application create a twitter bearer token. Copy the bearer token and keep it in a safe place
5. Open command prompt/shell prompt and Cd in to tweet-reader app
6. There is an environment file name env.sample. Create a new file named .env and copy the contents of env.sample file and set values. The following are env variable that need to be set

<table>
  <tr>
   <td>
<strong>ENV Variable</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>SERVER_PORT
   </td>
   <td>Enter the port on which server should run eg 3000 or 3002>
   </td>
  </tr>
  <tr>
   <td>DB_STORAGE_PATH
   </td>
   <td>The sqllite database storage file path
   </td>
  </tr>
  <tr>
   <td>TWITTER_BEARER_TOKEN
   </td>
   <td>Twitter bearer token of the registered application
   </td>
  </tr>
  <tr>
   <td>TWITTER_SEARCH_API_URL
   </td>
   <td>https://api.twitter.com/2/tweets/search/recent
   </td>
  </tr>
  <tr>
   <td>TWITTER_SEARCH_HASHTAG
   </td>
   <td>#liveperson
   </td>
  </tr>
  <tr>
   <td>SYNC_FREQUENCY
   </td>
   <td>Type 'Once' if tweets needs to be synce once or type '*' if tweets needs to synced frequently
   </td>
  </tr>
  <tr>
   <td>SYNC_INTERVAL
   </td>
   <td>Sync frequency in millisecond eg:30000 to sync every 30 seconds.
   </td>
  </tr>
</table>




7. Make sure that you have node 14.6 installed as this application has be tested against the same
8. In the command/shell prompt type in “npm start”.
9. Now the application should start up and some console messages should be displayed.


## Twitter API

The twitter api is a node express application. This application exposes a REST Endpoint  on resource path ‘/tweets’ ’to get all the tweets stored in the database.The data is read using sequelize orm.


### Design Decisions


<table>
  <tr>
   <td><strong>Area</strong>
   </td>
   <td><strong>Decision</strong>
   </td>
   <td><strong>Alternatives</strong>
   </td>
   <td><strong>Rationale</strong>
   </td>
  </tr>
  <tr>
   <td>API 
   </td>
   <td>REST
   </td>
   <td>SOAP
<p>
RPC
   </td>
   <td>REST is the most popular and widely adopted open standard..
   </td>
  </tr>
</table>



### Node packages 

Express - web framework

Sequelize - ORM framework


### Tech Debt/Enhancements



*   The current API doesn’t implement server side pagination/cursors and tries to fetch all records in one shot which can cause the API to timeout if there are too many records in database


### How to run?



10. Go to [https://github.com/sgopan/tweet-app](https://github.com/sgopan/tweet-app)
11. Clone the project to local directory using 

    git clone https://github.com/sgopan/tweet-app.git

12. Open command prompt/shell prompt and Cd in to tweet-api app
13. There is an environment file name env.sample. Create a new file named .env and copy the contents of env.sample file. The following are env variable that need to be set

<table>
  <tr>
   <td>
<strong>ENV Variables</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>DB_STORAGE_PATH
   </td>
   <td>The sqlite database storage file path. This path should be same as what was used to tweet-reader app
   </td>
  </tr>
  <tr>
   <td>SERVER_PORT
   </td>
   <td>Enter the server port eg 3000 or 3002. The port should be different if running on same host
   </td>
  </tr>
</table>




14. Make sure that you have node 14.6 installed as this application has be tested against the same
15. In the command/shell prompt type in “npm start”.
16. Now the application should start up and some console messages should be displayed.
17. Use postman to test the API by using endpoint http://&lt;<server>>:port/tweets


### Dependencies

The tweet-reader app should be run so that data gets populated in the database. Only then tweets data will be available via api otherwise API may return an error. Make sure that tweet-reader app and tweet-api point to the same database file


## Twitter UI

The twitter ui is a react application. This react app calls the tweet-api  REST Endpoint  on resource path ‘/tweets’ ’to get all the tweets stored in the database.Then the react app displays the data in a tabular format


### Design Decisions


<table>
  <tr>
   <td><strong>Area</strong>
   </td>
   <td><strong>Decision</strong>
   </td>
   <td><strong>Alternatives</strong>
   </td>
   <td><strong>Rationale</strong>
   </td>
  </tr>
</table>


N/A


### Libraries 

React - UI library

Bootstrap - Responsive UI framework 

Axios - call the tweet-api endpoint to fetch data


### Tech Debt/Enhancements



*   The current bootstrap table does not implement any pagination. This can be done as an enhancement. 


### How to run?



18. Go to [https://github.com/sgopan/tweet-app](https://github.com/sgopan/tweet-app)
19. Clone the project to local directory using 

    git clone https://github.com/sgopan/tweet-app.git

20. Open command prompt/shell prompt and Cd in to tweet-ui folder
21. There is an environment file name env.sample. Create a new file named .env and copy the contents of env.sample file. The following are env variable that need to be set

<table>
  <tr>
   <td>
<strong>ENV Variables</strong>
   </td>
   <td><strong>Values</strong>
   </td>
  </tr>
  <tr>
   <td>REACT_APP_TWEET_API_URL
   </td>
   <td>The tweet-api app rest endpoint url eg: http://localhost:&lt;<port>>/api/tweets
   </td>
  </tr>
  <tr>
   <td>PORT
   </td>
   <td>Enter the server port eg 3000 or 3002 or 8000
   </td>
  </tr>
</table>




22. Make sure that you have node 14.6 installed as this application has be tested against the same
23. In the command/shell prompt type in “npm start”.
24. Now the application should start up and some console messages should be displayed.
25. The UI should automatically open up and the tweet data will be shown in a tabular format


### Dependencies

The tweet-ui app is dependent on the tweet-api app for the data. Hence for data to be displayed the tweet -api app also should be running.


## Challenges Faced



1. The SQLite errors are sometimes very cryptic and don't say the actual problem. The tweet-api application was giving an error but SQLite error didn’t say the problem. So I had to use the SQLite browser tool to inspect the database and found that the table doesn’t exist.
2. Understanding the different twitter API versions and limitations. I had to read the documentation of multiple ones to get a view
3. Needed to brush up my node and react knowledge as I have not used it in last 6months to 1 year.