import React, { useState, useEffect } from "react";
//import uuid from "uuid";
import "./App.css";

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

function Comments({ comments, addComment, deleteBook, books, deleteAllBooks }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) return;
    addComment(value, comments._id);
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
        <button onClick={deleteAllBooks}>Delete all books...</button>
      </div>
    );
  }

  if (comments.isAllDeleted) {
    return (
      <div
        style={{ borderStyle: "solid", borderWidth: "thin", padding: "5px" }}
      >
        <p>All books deleted</p>
      </div>
    );
  }

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
          <button onClick={deleteAllBooks}>Delete all books...</button>
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
              {books[comments.index].comments.map((comment, index) => (
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
          <button onClick={deleteAllBooks}>Delete all books...</button>
        </div>
      )}
      <div></div>
    </div>
  );
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

function App() {
  const [books, setBooks] = useState(
    []
  );

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/books");
      res
        .json()
        .then(res => setBooks(res))
        .catch(err => console.log(err));
    }

    fetchData();

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

  const [comments, setComments] = useState({
    isHidden: true,
    isDeleted: false,
    index: null,
    _id: "no id",
    title: "no title",
    comments: []
  });


  function dispComments(index) {
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

  function addComment(value, currentId) {
    //const booksWithNewComments = [...books];
    //booksWithNewComments[comments.index].comments.push(value);
    //setBooks(booksWithNewComments);

    let singleBookURL = new URL (
      'http://localhost:5000' + "/api/books/" + currentId
    )

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

  function deleteBook(currentId) {

    let singleBookURL = new URL (
      'http://localhost:5000' + "/api/books/" + currentId
    )

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



    /*
    const newBooks = [...books];

    newBooks.splice(comments.index, 1);

    setBooks(newBooks);
    */

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
    setBooks([]);
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>Personal Library </h1>
        <h3 style={{ color: "gray" }}>
          FreeCodeCamp Apis And Microservices Project 03 - MERN stack version
        </h3>
      </div>

      <h1>Sample Front-End</h1>
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

export default App;
