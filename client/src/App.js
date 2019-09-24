import React, {useState} from 'react';
import uuid from 'uuid';
import './App.css';



function BooksDisplay( {index, book}) {
  return(
    <div className="BooksDisplay">
      {book._id}<br/>{book.title}{` - ${book.comments.length} comments`}
    </div>
  )
}


function App() {

  const [books, setBooks] = useState([
    {_id: uuid(), title: "New book", comments : ["first comment"]},
    {_id: uuid(), title: "1984", comments : []},
    {_id: uuid(), title: "Test Book ", comments : ["one", "two"]},
    {_id: uuid(), title: " Wikipedia offline", comments : ["test comment"]}
  ]);

  console.log(setBooks);
  console.log(books)


  return (
    <div className="App">
      <h1>Test di</h1>
      <div className="book-list">
        {
          books.map(
            (book, index) => (
              <BooksDisplay key={index} book={book}/>
            )
          )
        }

      </div>
    </div>
  
  );
}

export default App;
