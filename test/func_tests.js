var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);





describe('Routing tests', function() {

//get all books
  it('#example Test GET /api/books', function(done){
    chai.request(server)
     .get('/api/books')
     .end(function(err, res){
       assert.equal(res.status, 200);
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
})

describe('GET /api/books/[id] => book object with [id]', function(){
      
 // it('Test GET /api/books/[id] with id not in db',  function(done){
   // //done();
 // });
  
  it('Test GET /api/books/[id] with valid id in db',  function(done){
    chai.request(server)
    .get('/api/books/Wx7ZA7z39')
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");

      assert.equal(res.body._id, "Wx7ZA7z39");
      assert.equal(res.body.title, "test book2");
      assert.isArray(res.body.comments);




      done();
    });



  });
  
});



//'update' post
describe('POST /api/book/[id] -> add comment/expect book object with id', function() {

  it('Test POST /api/books/[id] with comment', function(done) {
    chai
    .request(server)
    .post('/api/books/GdPm0TDh_')
    .send({
      id: 'GdPm0TDh_',
      comment: 'mocha test comment'

    })
    .end(function(err,res) {
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");

      assert.equal(res.body._id, 'GdPm0TDh_');
      assert.equal(res.body.title, `test book`);
      assert.isArray(res.body.comments);


      done();
    })


  })
})
