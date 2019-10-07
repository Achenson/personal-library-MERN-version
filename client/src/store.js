import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//index.js is the rootReducer! is imported with different name
import rootReducer from "./reducers";

///
const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState, //optinal!
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
