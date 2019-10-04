import React, { useState, useEffect } from "react";
//import uuid from "uuid";
import "./App.css";

//import {Provider} from 'react-redux';

//import store from './store';

import { connect } from "react-redux";

import {
  fetchBooks,
  dispComments,
  deleteAllBooks,
  deleteBook,
  addComment
} from "./actions/postActions";

/*

App ( F dispComents F addBook)  | 2x state -> books, comments to disply (for clicked book)
    NewBookForm ( F. handleSubmit, -> addBook)to add a book    | 1x state (value for input)
    mapped BooksDisplay (-> dispComments ->index(from mapping) ->book(from mapping)) | stateless
    Comments (-> comments (state), books (state), addComment, deleteBook, books, deleteAllBooks) | 1x state (value for input)
*/

function NewBookForm({ addBook }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) return;
    addBook(value);
    setValue("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Book Title"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <br></br>
        <button style={{ width: "148px", height: "25px" }}>
          Submit New Book!
        </button>
      </form>
    </div>
  );
}

function Comments({books, comments, addComment, deleteBook, deleteAllBooks }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) return;
    addComment(value, comments._id);
    console.log("test");
    setValue("");
  }

  if (comments.isHidden) {
    return (
      <div>
        <div
          style={{ borderStyle: "solid", borderWidth: "thin", padding: "5px" }}
        >
          <p>Select a book to see it's details and comments</p>
        </div>
        <br></br>
        <button onClick={() => deleteAllBooks()}>Delete all books...</button>
      </div>
    );
  } else {
    if (comments.isAllDeleted) {
      return (
        <div>
            <div
          style={{ borderStyle: "solid", borderWidth: "thin", padding: "5px" }}
        >
          <p>All books deleted</p>
        </div>
        
        {(books.length !== 0)  && <button onClick={() => deleteAllBooks()}>Delete all books...</button>}
        </div>
      
      );
    } else {
      return (
        <div>
          <p>
            <b>{comments.title}</b>
            {` (id: ${comments._id})`}
          </p>
          {comments.isDeleted ? (
            <div>
              <div style={{ borderStyle: "solid", borderWidth: "thin" }}>
                <p>delete successful</p>
                <br></br>
                <br></br>
                <p>Refresh the page</p>
              </div>
              <button onClick={() => deleteAllBooks()}>
                Delete all books...
              </button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: "thin",
                  padding: "5px"
                }}
              >
                <ol>
                  {comments.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ol>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="New Comment"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                  <br></br>
                  <button style={{ width: "148px", height: "25px" }}>
                    Add Comment
                  </button>
                </form>
                <button
                  style={{ width: "148px", height: "25px" }}
                  onClick={() => deleteBook(comments._id)}
                >
                  Delete Book
                </button>
              </div>

              <br></br>
              <button onClick={() => deleteAllBooks()}>
                Delete all books...
              </button>
            </div>
          )}
          <div></div>
        </div>
      );
    }
  }
}

function BooksDisplay({ index, book, dispComments }) {
  return (
    <div>
      <div className="BooksDisplay">
        <ul>
          <li onClick={() => dispComments(index)}>
            {book.title}
            {` - ${book.comments.length} comments`}
          </li>
        </ul>
      </div>
    </div>
  );
}
//!!!!! imported actions creators must be passed here as props
function App({
  books,
  comments,
  fetchBooks,
  dispComments,
  deleteAllBooks,
  deleteBook,
  addComment
}) {
  //const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    //////////////////////////
    /*
    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/books");
      res
        .json()
        .then(res => setBooks(res))
        .catch(err => console.log(err));
    }

    fetchData();

  */
    ///////////////////////
    /*
    fetch("http://localhost:5000/api/books")
    
    .then(res => {
      console.log(res);
      //console.log(books);
      res.json();
    })
    .then(res => setBooks(res))
    .catch((err) => console.log(err))
    */
  });
  /*
  const [comments, setComments] = useState({
    isHidden: true,
    isDeleted: false,
    index: null,
    _id: "no id",
    title: "no title",
    comments: []
  });
*/
  /*
  function dispComments(index) { //when selecting a book!
    const newComments = {
      isHidden: false,
      isDeleted: false,
      isAllDeleted: false,
      index: index,
      _id: books[index]._id,
      title: books[index].title,
      comments: books[index].comments
    };

    setComments(newComments);
  }
*/
  function addBook(value) {
    //const newBooks = [...books, { _id: uuid(), title: value, comments: [] }];
    //=setBooks(newBooks);

    fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //endpoint: req.body.title
        title: value
      })
    })
      .then(res => res.json())
      .then(data0 => {
        console.log(data0);
        //window.location.reload(true);
      });
  }

  /*
  function addComment(value, currentId) {
    //const booksWithNewComments = [...books];
    //booksWithNewComments[comments.index].comments.push(value);
    //setBooks(booksWithNewComments);

    let singleBookURL = new URL(
      "http://localhost:5000/api/books/" + currentId
    );

    fetch(singleBookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        id: currentId,
        comment: value
      })
    })
      .then(res => res.json())
      .then(data2 => {
        //updating comments
        console.log(data2);
      });
  }

*/

  /*
  function deleteBook(currentId) {
    let singleBookURL = new URL(
      "http://localhost:5000" + "/api/books/" + currentId
    );

    fetch(singleBookURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data3 => {
        console.log(data3);
      });

    
   // const newBooks = [...books];

    //newBooks.splice(comments.index, 1);

   // setBooks(newBooks);
    

    const newComments = {
      isHidden: false,
      isDeleted: true,
      isAllDeleted: false,
      index: comments.index,
      _id: comments._id,
      title: comments.title,
      comments: comments.comments
    };

    setComments(newComments);
  }

*/

  /*
  function deleteAllBooks() {
    const newComments = {
      isHidden: false,
      isDeleted: false,
      isAllDeleted: true,
      index: comments.index,
      _id: comments._id,
      title: comments.title,
      comments: comments.comments
    };

    setComments(newComments);
    //setBooks([]);

    fetch("http://localhost:5000/api/books", {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(dataDelete => {
        console.log(dataDelete);
      });
  }
*/
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>Personal Library </h1>
        <h3 style={{ color: "gray" }}>
          FreeCodeCamp Apis And Microservices Project 03 - MERN stack version
        </h3>
      </div>
      <h2>User Stories</h2>
      <ol>
        <li>
          Nothing from my website will be cached in my client as a security
          measure.
        </li>
        <li>
          I will see that the site is powered by 'PHP 4.2.0' even though it
          isn't as a security measure.
        </li>
        <li>
          I can <b>post</b> a <code>title</code> to /api/books to add a book and
          returned will be the object with the <code>title</code> and a unique
          <code>_id</code>.
        </li>
        <li>
          I can <b>get</b> /api/books to retrieve an aray of all books
          containing <code>title</code>, <code>_id</code>, &
          <code>commentcount</code>.
        </li>
        <li>
          I can <b>get</b> /api/books/[_id] to retrieve a single object of a
          book containing <code>title</code>, <code>_id</code>, & an array of
          <code>comments</code> (empty array if no comments present).
        </li>
        <li>
          I can <b>post</b> a <code>comment</code> to /api/books/[_id] to add a
          comment to a book and returned will be the books object similar to
          <b>get</b> /api/books/[_id].
        </li>
        <li>
          I can <b>delete</b> /api/books/[_id] to delete a book from the
          collection. Returned will be 'delete successful' if successful.
        </li>
        <li>
          If I try to request a book that doesn't exist I will get a 'no book
          exists' message.
        </li>
        <li>
          I can send a <b>delete</b> request to /api/books to delete all books
          in the database. Returned will be 'complete delete successful' if
          successful.
        </li>
        <li>
          All 6 functional tests required are completed and passing (3 tests
          will be broken when 'delete all books' button is pressed! In this
          case: add a book to the data base, update id and title in
          /test/func_tests.js).
        </li>
        <li>
          (To run tests: install mocha globally, type 'mocha' in the terminal).
        </li>
        <li>
          <b>REACT hooks Front-End implemented</b>
        </li>
      </ol>
      <hr></hr>

      <h2>Sample Front-End</h2>
      <NewBookForm addBook={addBook} />
      <div className="book-list">
        {books.map((book, index) => (
          <BooksDisplay
            index={index}
            key={index}
            book={book}
            dispComments={dispComments}
          />
        ))}
      </div>
      <Comments
        comments={comments}
        addComment={addComment}
        deleteBook={deleteBook}
        books={books}
        deleteAllBooks={deleteAllBooks}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    books: state.totalState.books, // (1)
    comments: state.totalState.comments
  };
};

export default connect(
  mapStateToProps,
  { fetchBooks, dispComments, deleteAllBooks, deleteBook, addComment }
)(App); // (3)
//export default App;
