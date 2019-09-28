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


function Comments({ comments, addComment, deleteBook, books}) {

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
      <p><b>{books[comments.indexOfDisplayedBook].title}</b>{` (id: ${books[comments.indexOfDisplayedBook]._id})`}</p> 
      
        <ul>
          {books[comments.indexOfDisplayedBook].arrOfComments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
  
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='New Comment' value={value} onChange = {e => setValue(e.target.value)}/>
          <br></br>
          <button style={{width: '148px', height: '25px'}}>Add Comment</button>
        </form>
        <button style={{width: '148px', height: '25px'}} onClick={deleteBook}>Delete Book</button>
      </div>
    );
  } else {
    return(null)
  }


}

function BooksDisplay({ index, book, dispComments }) {
  return (
    <div>
      <div className="BooksDisplay">
        <p onClick={() => dispComments(index)}>
          {book.title}
          {` - ${book.arrOfComments.length} comments`}
        </p>
      </div>
     


    </div>
  );
}

function App() {
  const [books, setBooks] = useState([
    { _id: uuid(), title: "New book", arrOfComments: ["first comment"] },
    { _id: uuid(), title: "1984", arrOfComments: [] },
    { _id: uuid(), title: "Test Book ", arrOfComments: ["one", "two"] },
    { _id: uuid(), title: " Wikipedia offline", arrOfComments: ["test comment"] }
  ]);

  const [comments, setComments] = useState({
    isHidden: true,
    //bookTitle: "book title",
    //objectId: "randomObjectId123",
    //arrOfComments: ["comment1", "comment2"]
    indexOfDisplayedBook: 0
  });

  console.log(setBooks);
  console.log(books);

  function dispComments(index) {
    const newComments = {
      isHidden: false,
      //bookTitle: books[index].title,
      //objectId: books[index]._id,
      //arrOfComments: [...books[index].comments]
      indexOfDisplayedBook: index
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

  function deleteBook () {
    const newBooks = [...books];

    function findBookToDelete(el) {
      return el._id===comments.objectId
    }

    let indexOFBookToDelete = newBooks.findIndex(findBookToDelete);

    const newBooks2 = newBooks.splice(indexOFBookToDelete, 1)

    setBooks(newBooks2);





  }

  return (
    <div className="App">
      <h1>Test di</h1>
      <NewBookForm addBook={addBook}/>
      <div className="book-list">
        {books.map((book, index) => (
          <BooksDisplay index={index} key={index} book={book} dispComments={dispComments}/>
        ))}
      </div>
      <Comments comments={comments} addComment={addComment} deleteBook={deleteBook} books={books} />


  
    </div>
  );
}

export default App;
