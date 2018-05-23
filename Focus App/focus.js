
// called when the page is loaded
$().ready(function() 
{
	// check for browser support
	if (typeof(Storage) == undefined) {		
		showErrorPage();
	}
	else
	{
		// check for existing user
		if (localStorage.getItem('username')) {
			showHomePage();
		}
		// or create 'new' account
		else {
			showSetupPage();
		}
		
		// set timer to auto update background image
		updateBackgroundImage();
		
		setInterval(function(){
			//updateBackgroundImage();
		}, 1*60*1000);
	}
});

// show an error message on the screen if the browser
// does not support local storage
function showErrorPage()
{
	$('.panel').hide(); // hide all panels
	$('.error').show(); // show the error panel
}

// the setup page will get the user name and save it in the 
// browser local storage. 
// this page will only be displayed if no username has been defined beffore.
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

// the main page. if a username has set, this will be the first page.
function showHomePage()
{
	$('.home').fadeIn(3000).find('input').focus();
	showTime();
}

// this function add 0 in front of the number that are < 10
function formatTime(i) 
{
  if (i < 10) {
    i = "0" + i;
  }
  
  return i;
}

// update current time on screen
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

// retrieves the background image from 'unsplash' website
function updateBackgroundImage()
{
	var unsplashUrl = "https://api.unsplash.com/photos/random?featured";
	var unsplashClientId = "a24e1fa3b77c93935f0552ebf6354a3540e9aa356caf80a1fcb55125fdb16110";
	
    $.getJSON(unsplashUrl + "&client_id=" + unsplashClientId, function(data)
	{        
        // change data.urls.full to data.urls.regular for faster loading but 
		// image quality will be slightly worse
        var photoUrl = data.urls.regular;
        
        $("body").css("background-image", "url(" + photoUrl + ")");       
    })
	.fail(function(){
		$("body").css("background-image", "url(static.jpg)");
	});
}
