var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var pool = require('../ConnectionPooling.js');
//var supertest = require('supertest');  
//var chai = require('chai');  
//var uuid = require('uuid'); 

var agent = require('chai').request.agent(app);

describe('App', function () {
    it('Sample', function () {
        assert.equal(app.hello(), 'hello');
    });
});

describe('HomeAway', function () {



    it('POST Logout', function () {

        return chai.request(app)
            .post('/logout')
            .then(function (res) {
                expect(res).to.have.status(200);                
            });
            

    });

    it('POST /Login', function () {
        this.timeout(50000);


       // return chai.request.agent(app)
        agent.post('/login')
            .send({                
                    Email: 'aehari2010@gmail.com',
                    Password: 'aearivoi'                
            })
            .then(function (res) {
                assert.equal(res.status, 200);
                      
            });
    });

    it('Post /Search', function(){

        
            agent.post('/search')    
            .send({
                searchText: 'San Jose',
                startDate: '10-01-2018',
                endDate: '11-01-2018'
            })        
            .then(function (res) {
                expect(res).to.have.status(200);                           
            });
    });

    it('Get /Profile Details', function(){
        //return chai.request.agent(app)
            agent.get('/profile-details')
            .then(function(res){                
                expect(res).to.have.status(200);
            });
    })


});