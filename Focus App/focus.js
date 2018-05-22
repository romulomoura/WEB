
// called when the page is loaded
$().ready(function() 
{
	// check for browser support
	if (typeof(Storage) == undefined) {		
		showErrorPage();
	} 
	// check for existing user
	else if (localStorage.getItem('username')) {
		showHomePage();
	}
	// create 'new' account
	else {
		showSetupPage();
	}
});

function showErrorPage()
{
	$('.panel').hide(); // hide all panels
	$('.error').show(); // show the error panel
}

function showSetupPage()
{	
	// press ENTER on setup screen to get the user name
	$('.setup input').off('keyup.setup').on('keyup.setup', function(e) 
	{
		if (e.keyCode == 13) // 'enter' keyCode
		{
			// check if the username is valid
			var name = $(this).val();
			
			if (name && name.length > 0)
			{
				// save it to the broser storage
				localStorage.setItem('username', name);
				
				// go to home screen
				$('.setup').fadeOut(1000, function() {
					showHomePage();
				});							
			}
		}
	});
	
	$('.panel').hide(); // hide all panels
	
	// show setup panel gently
	$('.setup').fadeIn(3000).find('input').focus();
}

function showHomePage()
{
	$('.home').fadeIn(3000).find('input').focus();
	showTime();
}

// this function add 0 in front of the number that are < 10
function formatTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// update current time
function showTime() 
{
  // get current date
  var today = new Date();
  
  var hour = today.getHours();
  var minutes = today.getMinutes();   
  
  $('.home h1').html(formatTime(hour) + ":" + formatTime(minutes));
  
  var period = hour < 12 ? 'morning' : (hour < 18 ? 'afternoon' : 'evening');
  
   $('.home h2').html('Good ' + period + ', ' + localStorage.getItem('username') + '.');
    
  // update the time information on the screen
  t = setTimeout(function() {
    showTime()
  }, 1000);
}
