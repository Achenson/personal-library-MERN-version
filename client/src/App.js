import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";

/*

App (2x states, F dispComents)
  BooksDisplay (-> dispComments ->index ->book)
  Comments (-> comments state)
*/

function Comments({ comments }) {
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      {`${comments.bookTitle} (id: ${comments.objectId})`}
      <ul>
        {comments.arrOfComments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

function BooksDisplay({ index, book, dispComments }) {
  return (
    <div>
      <div className="BooksDisplay">
        <p onClick={() => dispComments(index)}>
          {book.title}
          {` - ${book.comments.length} comments`}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([
    { _id: uuid(), title: "New book", comments: ["first comment"] },
    { _id: uuid(), title: "1984", comments: [] },
    { _id: uuid(), title: "Test Book ", comments: ["one", "two"] },
    { _id: uuid(), title: " Wikipedia offline", comments: ["test comment"] }
  ]);

  const [comments, setComments] = useState({
    bookTitle: "book title",
    objectId: "randomObjectId123",
    arrOfComments: ["comment1", "comment2"]
  });

  console.log(setBooks);
  console.log(books);

  function dispComments(index) {
    const newComments = {
      bookTitle: books[index].title,
      objectId: books[index]._id,
      arrOfComments: [...books[index].comments]
    }
   
    setComments(newComments);
  };

  return (
    <div className="App">
      <h1>Test di</h1>
      <div className="book-list">
        {books.map((book, index) => (
          <BooksDisplay index={index} key={index} book={book} dispComments={dispComments} />
        ))}
      </div>

      <Comments comments={comments} />
    </div>
  );
}

export default App;
