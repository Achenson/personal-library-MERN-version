var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);





describe('Routing tests', function() {

//get all books
// stops working if delete all books button is pressed! works after 2nd try though
  it('#example Test GET /api/books', function(done){
    chai.request(server)
     .get('/api/books')
     .end(function(err, res){
       assert.equal(res.status, 200);
       assert.equal(res.type, "application/json");

       assert.isArray(res.body, 'response should be an array');
       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
       assert.property(res.body[0], 'title', 'Books in array should contain title');
       assert.property(res.body[0], '_id', 'Books in array should contain _id');
       done();
     });
 });



//post a book
  it("POST /api/books with title => create book object/expect book object", function(done) {
    chai
    .request(server)
    .post('/api/books')
    .send({
      title: 'mocha test book'
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");

      assert.equal(res.body.title, 'mocha test book');
      assert.property(res.body, '_id');
      assert.property(res.body, 'comments');
    
      done();


    })


  })



  it('Test POST /api/books with no title given', function(done) {
    chai
    .request(server)
    .post('/api/books')
    .send({
      title: ''
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");

      
      assert.equal(res.body.message, 'please enter book title');
    
      done();


    })


    
  });
  





})

describe('GET /api/books/[id] => book object with [id]', function(){
      
 it('Test GET /api/books/[id] with id not in db',  function(done){
  chai.request(server)
  .get('/api/books/idnotpresent24525626')
  .end(function(err, res){
    assert.equal(res.status, 200);
    assert.equal(res.type, "application/json");

    assert.equal(res.body.message, 'no book exists');
    
    



   done();
  })
 });
  
 // stops working if delete all books button is pressed!
  it('Test GET /api/books/[id] with valid id in db',  function(done){
    chai.request(server)
    .get('/api/books/nBDf6F8s4')
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");

      assert.equal(res.body._id, "nBDf6F8s4");
      assert.equal(res.body.title, "mocha update");
      assert.isArray(res.body.comments);




      done();
    });



  });
  
});



//'update' post
describe('POST /api/book/[id] -> add comment/expect book object with id', function() {


  // stops working if delete all books button is pressed!
  it('Test POST /api/books/[id] with comment', function(done) {
    chai
    .request(server)
    .post('/api/books/nBDf6F8s4')
    .send({
      id: 'nBDf6F8s4',
      comment: 'mocha test comment'

    })
    .end(function(err,res) {
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");

      assert.equal(res.body._id, 'nBDf6F8s4');
      assert.equal(res.body.title, `mocha update`);
      assert.isArray(res.body.comments);


      done();
    })


  })
})
