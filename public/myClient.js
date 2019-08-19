let display = document.getElementById("display");

let myURL = new URL(location.origin + "/api/books");
let displayList = document.getElementById("displayList");
//for single book details
let detailTitle = document.getElementById("detailTitle");
let detailComments = document.getElementById("detailComments");

//gettin all books
let displayListInnerHtml = "";

fetch(myURL)
  .then(res => res.json())
  .then(data => {
    // console.log(data);

    data.map(el => {
      //add id to attributes!!!!!!!!!
      displayListInnerHtml += `<li id='${el._id}'>${el.title} - ${
        el.commentcount
      }</li>`;
    });

    displayList.innerHTML = displayListInnerHtml;

    //frontEnd - newBookForm

    let newBookForm = document.getElementById('newBookForm');
    let newBookInput = document.getElementById('bookTitleToAdd');

    newBookForm.onsubmit = function(e) {
      e.preventDefault()

      fetch(myURL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newBookInput.value
          
        })
      })
        .then(res => res.json())
        .then(data0 => {
          console.log(data0)
          window.location.reload(true);
        })



    }






    //gettin all <li> children of #displayList
    let allBooks = document.querySelectorAll("#displayList > li");

    console.log(allBooks);

    //getting details of a book that was clicked
    for (let el of allBooks) {
      el.onclick = e => {
        let myEventTargetId = e.target.id;

        console.log(el.innerHTML);
        console.log(myEventTargetId);

        let singleBookURL = new URL(
          location.origin + "/api/books/" + myEventTargetId
        );

        fetch(singleBookURL)
          .then(res => res.json())
          .then(data => {
            console.log(data.title);
            //getting title & id
            detailTitle.innerHTML = `<b>${data.title}</b> - (id: ${data._id})`;
            detailComments.innerHTML = "";

            //getting comments
            data.comments.map(el => {
              detailComments.innerHTML += `<li>${el}</li>`;
            });

            

            //make add comment & delete visible
            //...

            let commentFrontEnd = document.getElementById("commentFrontEnd");
            let inputFrontEnd = document.getElementById("inputFrontEnd");
            //add comment front end 
            commentFrontEnd.onsubmit = function(e) {
              e.preventDefault();

              fetch(singleBookURL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                  id: data._id,
                  comment: inputFrontEnd.value
                })
              })
                .then(res => res.json())
                .then(data2 => {
                  //updating comments
                  console.log(data2);

                  detailComments.innerHTML += `<li>${
                    data2.comments[data2.comments.length - 1]
                  }</li>`;
                });

            };

            //Delete Book

            let deleteOne = document.getElementById('deleteOneFrontEnd');

            deleteOne.onsubmit = function(e) {
              e.preventDefault();

              fetch(singleBookURL, {
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json"
                }
              }
              )
              .then(res => res.json())
              .then(data3 => {
                console.log('')
                console.log(data3);
                
                detailComments.innerHTML = `<p>${data3.message}</p><p>Refresh the page</p>`;


                
                
              })
              
            
            }






            
          });
      };
    }
  });

//rendering all books
