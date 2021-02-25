//Set env variables
process.env.DB_STORAGE_PATH = 'C:/codechallenge/tweets/tweet-app/db/';
process.env.SERVER_PORT = 3002

//Require the dev-dependencies
const Tweet = require('../models/tweet')
const seed = require('../config/db.seed');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Tweets', () => {

    beforeEach(async () => { //Before each test we delete the database
        try {
            await seed();
        }
        catch (e) {
            console.log("error while dropping table");
        }
    });

    describe('/GET tweets', () => {
        it('it should GET all tweets', (done) => {        
            chai.request(server) 
                .get('/tweets')     
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                    done();
                });
        });
    });

   describe('/GET tweets', () => {
        it('it should GET zero tweets with error', async () => {
            await Tweet.drop();
            chai.request(server)
                .get('/tweets')
                .end((err, res) => {
                    res.should.have.status(500);
       
                });
        });
    });   

});