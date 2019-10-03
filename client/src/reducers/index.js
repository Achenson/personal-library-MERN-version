//combining all reducers

import { combineReducers } from "redux";

import {
  FETCH_BOOKS,

  DELETE_ALL,
  DISPLAY_COMMENTS,
  
  DELETE_BOOK
} from "../actions/postActions";

const initialState = {
  //represents posts that are coming from are actions,
  // in actions there will be a fetch request
  books: [],
  //represents single post that we add
  comments: {
    isHidden: true,
    isDeleted: false,
    isAllDeleted: false,
    index: null,
    _id: "no id",
    title: "no title",
    comments: []
  }
};

//evaluates what action type we are dealing with
function postReducer(state = initialState, action) {
  //mandatory, action.type is being evaluated
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: action.payload
      }
    case DELETE_ALL:
      return {
        ...state,
        //books state changed automatically?
        comments: action.payload
      }
    case DISPLAY_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    case DELETE_BOOK:
      return {
        ...state,
        //books: [],
        //books state changed automatically?
        comments: action.payload
      }
     default:
      return state;
  }
}

// in seperate file?

//object with reducers, posts - arbitrary
export default combineReducers({
  totalState: postReducer
});
