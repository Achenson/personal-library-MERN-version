/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var shortid = require("shortid");

//userId: {
  //type: String,
  //default: shortid.generate
//},

dotenv.config();

const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

mongoose
  .connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => console.log("connection succesfull"))
  .catch(err => console.log(err));


module.exports = function (app) {

  const BookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      default: shortid.generate
    },
    comments: {
      type: Array,
      default: []
    }

  })

  const Book = mongoose.model('Book', BookSchema);







  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      var title = req.body.title;

      let newBook = new Book({
        title: title

      })

      newBook.save(err => {
        if (err) return console.error(err)
      })

      console.log(req.body);
      res.json(newBook);
      

      //response will contain new book object including atleast _id and title
    })





    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;


      Book.findOneAndUpdate(
        {
          _id: bookid
        },
        {
          $push: {
            comments: comment
            
          }
        }
      ).exec( (err, data) => {
        if (err) return console.error(err);

        if(data) {
          console.log('Book updated')
         
          res.json({
            title: data.title
          });

        }
      })



      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
