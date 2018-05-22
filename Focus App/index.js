
//This function add 0 in front of the number that are < 10
function formatTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//this function show the time each 0,5s
function showTime() {
  //Get current date
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  
  // add a zero in front of numbers<10
  m = formatTime(m);
  s = formatTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  showGreeting(h);  
  //update the time information on the screen
  t = setTimeout(function() {
    showTime()
  }, 500);
}

//This function show a especific greeting according to the time
function showGreeting(h) {

	if ((h>00) && (h<12))
	{
		document.getElementById('greeting').innerHTML = "Good morning!";
	}
	else if ((h>12) && (h<18))
	{
		document.getElementById('greeting').innerHTML = "Good afternoon!";
	}
	else if ((h>18) && (h<=00)){
		document.getElementById('greeting').innerHTML = "Good evening!";
	}
}

showTime();



