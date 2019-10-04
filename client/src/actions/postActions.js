//action types, seperate file?
import store from '../store.js';

export const FETCH_BOOKS = "FETCH_POSTS";
//export const COMMENTS = 'COMMENTS';
//ADD_BOOK nie jest potrzebny, bo  poj. książka
//jest tylko w stacie lokalnym! inaczej niż w przykładzie TRAVERSY
//export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_ALL = "DELETE_ALL";

export const DISPLAY_COMMENTS = "DISPLAY_COMMENTS";
//ADD_COMMENT nie jest potrzebny bo poj. komentarz
//jest tylko w stacie lokalnym!
//export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_BOOK = "DELETE_BOOK";

//postAcions - seperate file?

export const fetchBooks = () => dispatch => {
  async function fetchData() {
    const res = await fetch("http://localhost:5000/api/books");
    res
      .json()
      .then(books =>
        dispatch({
          type: FETCH_BOOKS,
          payload: books
        })
      )
      .catch(err => console.log(err));
  }

  fetchData();
};

export const dispComments = index => dispatch => {

  const newComments = {
    isHidden: false,
    isDeleted: false,
    isAllDeleted: false,
    index: index,
    _id: store.getState().totalState.books[index]._id,
    title: store.getState().totalState.books[index].title,
    comments: store.getState().totalState.books[index].comments
  };

  dispatch({
    type: DISPLAY_COMMENTS,
    payload: newComments
  });
};

export const deleteBook = currentId => dispatch => {
  let singleBookURL = new URL(
    "http://localhost:5000/api/books/" + currentId
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

      const newComments = {
        isHidden: false,
        isDeleted: true,
        isAllDeleted: false,
        index: store.getState().totalState.comments.index,
        _id: store.getState().totalState.comments._id,
        title: store.getState().totalState.comments.title,
        comments: store.getState().totalState.comments.comments
      };

      


      dispatch({
        type: DELETE_BOOK,
        payload: newComments
      });
    });
};

export const deleteAllBooks = () => dispatch => {
  fetch("http://localhost:5000/api/books", {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(dataDelete => {
      console.log(dataDelete);
      
      const newComments = {
        isHidden: false,
        isDeleted: false,
        isAllDeleted: true,
        index: null,
        _id: 'no id',
        title: 'no title',
        comments: []
      };

      dispatch({
        type: DELETE_ALL,
        payload: newComments
      });
    });
};
