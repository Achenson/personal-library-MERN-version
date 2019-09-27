import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";

/*

App ( F dispComents F addBook)  | 2x state -> books, comments to disply (for clicked book)
    NewBookForm (-> addBook F. handleSubmit)to add a book    | 1x state (value for input)
    BooksDisplay (-> dispComments ->index ->book) | stateless
    Comments (-> comments state) | 1x state
*/

function NewBookForm({addBook}) {

  const [value, setValue] = useState('');

  function handleSubmit (e) {
    e.preventDefault();

    if(!value) return;
    addBook(value);
    setValue('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='New Book Title' value={value} onChange = {e => setValue(e.target.value)}/>
        <br></br>
        <button style={{width: '148px', height: '25px'}}>Submit New Book!</button>
      </form>
    </div>
  )
}


function Comments({ comments, addComment }) {

  const [value, setValue] = useState('');

  function handleSubmit (e) {
    e.preventDefault();

    if(!value) return;
    addComment(value);
    setValue('');
  }


  if(!comments.isHidden) {
    return (
      <div style={{ backgroundColor: "lightgray" }}>
      <p><b>{comments.bookTitle}</b>{` (id: ${comments.objectId})`}</p> 
      
        <ul>
          {comments.arrOfComments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
  
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='New Comment' value={value} onChange = {e => setValue(e.target.value)}/>
          <br></br>
          <button style={{width: '148px', height: '25px'}}>Add Comment</button>
        </form>
        <button style={{width: '148px', height: '25px'}}>Delete Book</button>
      </div>
    );
  } else {
    return(null)
  }


}

function BooksDisplay({ index, book, dispComments, comments }) {
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
    isHidden: true,
    bookTitle: "book title",
    objectId: "randomObjectId123",
    arrOfComments: ["comment1", "comment2"]
  });

  console.log(setBooks);
  console.log(books);

  function dispComments(index) {
    const newComments = {
      isHidden: false,
      bookTitle: books[index].title,
      objectId: books[index]._id,
      arrOfComments: [...books[index].comments]
    }
   
    setComments(newComments);
  };

  function addBook (value) {
    const newBooks = [...books, {_id: uuid(), title: value, comments: [] }];
    setBooks(newBooks);
  }

  function addComment (value) {
    
    const booksWithNewComments = [...books];
    //searching for specific book in books state by using comments' state objectId
    function findBook(el) {
      return el._id === comments.objectId 
    }
    let indexOfBookToChange = booksWithNewComments.findIndex(findBook)
    
    booksWithNewComments[indexOfBookToChange].comments.push(value);

    setBooks(booksWithNewComments);

    const newComments = {
      isHidden: false,
      bookTitle: books[indexOfBookToChange].title,
      objectId: books[indexOfBookToChange]._id,
      arrOfComments: [...books[indexOfBookToChange].comments]
    }
    setComments(newComments);


  }

  return (
    <div className="App">
      <h1>Test di</h1>
      <NewBookForm addBook={addBook}/>
      <div className="book-list">
        {books.map((book, index) => (
          <BooksDisplay index={index} key={index} book={book} dispComments={dispComments} comments={comments}/>
        ))}
      </div>
      <Comments comments={comments} addComment={addComment} />


  
    </div>
  );
}

export default App;
