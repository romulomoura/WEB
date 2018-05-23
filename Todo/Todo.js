
////+++++++++++++++++++++++++++++++++++++++++++/////
//CODING FOR MODAL BOX.(TODO)

// Get the modal
var modal = document.getElementById('myModal');

// Get the <h6> that opens the modal
var todo = document.getElementById("mytodo");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closing")[0];

//clicks on the (todo), open the modal
todo.onclick = function() {
    modal.style.display = "block";

}

//clicks on (x), close the modal
span.onclick = function() {
    modal.style.display = "none";

}

// closing when click outside modal box
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





/////////////////////////=====================//
// CODING FOR THE LIST


  // Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {

  //test  here


  // var tdNubmer = document.getElementById("number");

  ///........

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("What is your focus today!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  console.log("checked");
  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);



  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";

    }
  }
}
