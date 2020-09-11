//manage Book Classes

class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
}

//CLASS UI FOR HANDLING CHnges
class UI {
  static displayBooks() {
  
    const books = Store.getBooks();
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const tblBookList = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `<td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.year}</td>
    <td> <button class="btn btn-danger delete">X</button></td>
    `;
    tblBookList.appendChild(row);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#year").value = "";
  }

  static RemoveBook(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }
}

//Store class: Handles Stoarage
class Store {
    static getBooks(){
      let  books;
      if(localStorage.getItem('books') === null){
        books=[];
      }else{
        books =JSON.parse(localStorage.getItem('books')) 
      }


      return books;
    }

    static addBook(book){
      const books= Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
    }

    
    static removeBook(year){
      const books= Store.getBooks();
     books.forEach((book,index)=>{
     if(book.year ===year ){
       books.splice(index,1)
     }
     })
      localStorage.setItem('books',JSON.stringify(books));
    }
}

//events
//events to display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//events to add a book
document.querySelector("#book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  //get the values
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const year = document.querySelector("#year");

  if (title.value !== "" && author.value !== "" && year.value !== "") {
    const book = new Book(title.value, author.value, year.value);
    UI.addBookToList(book);
    Store.addBook(book);
    //clear field
    UI.clearField();
  } else {
    alert("Please fill the form Details");
  }
});

//removing a book

document.querySelector("#book-list").addEventListener("click", (event) => {
  //remove a book
  UI.RemoveBook(event.target);
 //console.log(event.target.parentElement.previousElementSibling.textContent) ;
  Store.removeBook(event.target.parentElement.previousElementSibling.textContent.trim())
});
