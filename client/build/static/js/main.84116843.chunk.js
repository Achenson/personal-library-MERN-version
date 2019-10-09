(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{16:function(e,t,n){e.exports=n(28)},27:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var l=n(0),o=n.n(l),a=n(4),r=n.n(a),c=n(2),i=n(12),s=n(13),m=n(7),d=n.n(m),u=n(14),b="FETCH_POSTS",E="DELETE_ALL",p="DISPLAY_COMMENTS",f="DELETE_BOOK",h="ADD_COMMENT";function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g={books:[],comments:{isHidden:!0,isDeleted:!1,isAllDeleted:!1,index:null,_id:"no id",title:"no title",comments:[]}};var v=Object(c.c)({totalState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b:return y({},e,{books:t.payload});case E:case p:case f:case h:return y({},e,{comments:t.payload});default:return e}}}),S=[i.a],w=Object(c.e)(v,{},Object(c.d)(c.a.apply(void 0,S),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),O=n(5),D=n(10);n(27);function _(e){var t=e.addBook,n=Object(l.useState)(""),a=Object(D.a)(n,2),r=a[0],c=a[1];return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),r&&(t(r),c(""))}},o.a.createElement("input",{type:"text",placeholder:"New Book Title",value:r,onChange:function(e){return c(e.target.value)}}),o.a.createElement("br",null),o.a.createElement("button",{style:{width:"148px",height:"25px"}},"Submit New Book!")))}function j(e){var t=e.books,n=e.comments,a=e.addComment,r=e.deleteBook,c=e.deleteAllBooks,i=Object(l.useState)(""),s=Object(D.a)(i,2),m=s[0],d=s[1];return n.isHidden?o.a.createElement("div",null,o.a.createElement("div",{style:{borderStyle:"solid",borderWidth:"thin",padding:"5px"}},o.a.createElement("p",null,"Select a book to see it's details and comments")),o.a.createElement("br",null),o.a.createElement("button",{onClick:function(){return c()}},"Delete all books...")):n.isAllDeleted?o.a.createElement("div",null,o.a.createElement("div",{style:{borderStyle:"solid",borderWidth:"thin",padding:"5px"}},o.a.createElement("p",null,"All books deleted")),0!==t.length&&o.a.createElement("button",{onClick:function(){return c()}},"Delete all books...")):o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement("b",null,n.title)," (id: ".concat(n._id,")")),n.isDeleted?o.a.createElement("div",null,o.a.createElement("div",{style:{borderStyle:"solid",borderWidth:"thin"}},o.a.createElement("p",null,"delete successful"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("p",null,"Refresh the page")),o.a.createElement("button",{onClick:function(){return c()}},"Delete all books...")):o.a.createElement("div",null,o.a.createElement("div",{style:{borderStyle:"solid",borderWidth:"thin",padding:"5px"}},o.a.createElement("ol",null,n.comments.map((function(e,t){return o.a.createElement("li",{key:t},e)}))),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),m&&(a(m,n._id),console.log("test"),d(""))}},o.a.createElement("input",{type:"text",placeholder:"New Comment",value:m,onChange:function(e){return d(e.target.value)}}),o.a.createElement("br",null),o.a.createElement("button",{style:{width:"148px",height:"25px"}},"Add Comment")),o.a.createElement("button",{style:{width:"148px",height:"25px"},onClick:function(){return r(n._id)}},"Delete Book")),o.a.createElement("br",null),o.a.createElement("button",{onClick:function(){return c()}},"Delete all books...")),o.a.createElement("div",null))}function C(e){var t=e.index,n=e.book,l=e.dispComments;return o.a.createElement("div",null,o.a.createElement("div",{className:"BooksDisplay"},o.a.createElement("ul",null,o.a.createElement("li",{onClick:function(){return l(t)}},n.title," - ".concat(n.comments.length," comments")))))}var x=Object(O.b)((function(e){return{books:e.totalState.books,comments:e.totalState.comments}}),{fetchBooks:function(){return function(e){function t(){return(t=Object(u.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/books");case 2:t.sent.json().then((function(t){return e({type:b,payload:t})})).catch((function(e){return console.log(e)}));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}},dispComments:function(e){return function(t){var n={isHidden:!1,isDeleted:!1,isAllDeleted:!1,index:e,_id:w.getState().totalState.books[e]._id,title:w.getState().totalState.books[e].title,comments:w.getState().totalState.books[e].comments};t({type:p,payload:n})}},deleteAllBooks:function(){return function(e){fetch("/api/books",{method:"DELETE"}).then((function(e){return e.json()})).then((function(t){console.log(t);e({type:E,payload:{isHidden:!1,isDeleted:!1,isAllDeleted:!0,index:null,_id:"no id",title:"no title",comments:[]}})}))}},deleteBook:function(e){return function(t){var n=new URL("/api/books/"+e);fetch(n,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e);var n={isHidden:!1,isDeleted:!0,isAllDeleted:!1,index:w.getState().totalState.comments.index,_id:w.getState().totalState.comments._id,title:w.getState().totalState.comments.title,comments:w.getState().totalState.comments.comments};t({type:f,payload:n})}))}},addComment:function(e,t){return function(n){var l=new URL("/api/books/"+t);fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,comment:e})}).then((function(e){return e.json()})).then((function(e){console.log(e)}));var o=w.getState().totalState.comments.comments;console.log(o),o.push(e),console.log(o);var a={isHidden:!1,isDeleted:!1,isAllDeleted:!1,index:w.getState().totalState.comments.index,_id:w.getState().totalState.comments._id,title:w.getState().totalState.comments.title,comments:o};n({type:h,payload:a})}}})((function(e){var t=e.books,n=e.comments,a=e.fetchBooks,r=e.dispComments,c=e.deleteAllBooks,i=e.deleteBook,s=e.addComment;return Object(l.useEffect)((function(){a()})),o.a.createElement("div",{className:"App"},o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("h1",null,"Personal Library "),o.a.createElement("h3",{style:{color:"gray"}},"FreeCodeCamp Apis And Microservices Project 03 - MERN stack version")),o.a.createElement("h2",null,"User Stories"),o.a.createElement("ol",null,o.a.createElement("li",null,"Nothing from my website will be cached in my client as a security measure."),o.a.createElement("li",null,"I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure."),o.a.createElement("li",null,"I can ",o.a.createElement("b",null,"post")," a ",o.a.createElement("code",null,"title")," to /api/books to add a book and returned will be the object with the ",o.a.createElement("code",null,"title")," and a unique",o.a.createElement("code",null,"_id"),"."),o.a.createElement("li",null,"I can ",o.a.createElement("b",null,"get")," /api/books to retrieve an aray of all books containing ",o.a.createElement("code",null,"title"),", ",o.a.createElement("code",null,"_id"),", &",o.a.createElement("code",null,"commentcount"),"."),o.a.createElement("li",null,"I can ",o.a.createElement("b",null,"get")," /api/books/[_id] to retrieve a single object of a book containing ",o.a.createElement("code",null,"title"),", ",o.a.createElement("code",null,"_id"),", & an array of",o.a.createElement("code",null,"comments")," (empty array if no comments present)."),o.a.createElement("li",null,"I can ",o.a.createElement("b",null,"post")," a ",o.a.createElement("code",null,"comment")," to /api/books/[_id] to add a comment to a book and returned will be the books object similar to",o.a.createElement("b",null,"get")," /api/books/[_id]."),o.a.createElement("li",null,"I can ",o.a.createElement("b",null,"delete")," /api/books/[_id] to delete a book from the collection. Returned will be 'delete successful' if successful."),o.a.createElement("li",null,"If I try to request a book that doesn't exist I will get a 'no book exists' message."),o.a.createElement("li",null,"I can send a ",o.a.createElement("b",null,"delete")," request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful."),o.a.createElement("li",null,"All 6 functional tests required are completed and passing (3 tests will be broken when 'delete all books' button is pressed! In this case: add a book to the data base, update id and title in /test/func_tests.js)."),o.a.createElement("li",null,"(To run tests: install mocha globally, type 'mocha' in the terminal)."),o.a.createElement("li",null,o.a.createElement("b",null,"REACT hooks Front-End implemented.")),o.a.createElement("li",null,o.a.createElement("b",null,"REDUX implemented."))),o.a.createElement("hr",null),o.a.createElement("h2",null,"Sample Front-End"),o.a.createElement(_,{addBook:function(e){fetch("/api/books",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e})}).then((function(e){return e.json()})).then((function(e){console.log(e)}))}}),o.a.createElement("div",{className:"book-list"},t.map((function(e,t){return o.a.createElement(C,{index:t,key:t,book:e,dispComments:r})}))),o.a.createElement(j,{comments:n,addComment:s,deleteBook:i,books:t,deleteAllBooks:c}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(O.a,{store:w},o.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[16,1,2]]]);
//# sourceMappingURL=main.84116843.chunk.js.map