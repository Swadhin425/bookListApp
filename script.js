const title= document.querySelector("#title");
const author= document.querySelector("#author");
const year= document.querySelector("#year");

const btnAddBook= document.querySelector("#addBook");


const tblBookList= document.querySelector("#book-list");


//add evnts to adda element to book-list
btnAddBook.addEventListener('click',(event)=>{
console.log(event);
event.preventDefault();
const row=document.createElement("tr");
row.innerHTML = `<td> ${title.value}</td>
<td> ${author.value}</td>
<td> ${year.value}</td>
<td> <button class="btn btn-danger delete">X</button></td>
`
tblBookList.appendChild(row);
clearField()
})

//remove a element from booklist
tblBookList.addEventListener("click",(event)=>{


if(event.target.classList.contains('delete')){
    event.target.parentElement.parentElement.remove();
}
})


function clearField(){
title.value="";
author.value="";
year.value="";
}
