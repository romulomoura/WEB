
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
	$('.setup input').val('');

	$('.setup').fadeIn(3000, function() {
		$(this).find('input').focus();
	});
}

// the main page. if a username has set, this will be the first page.
function showHomePage()
{
	$('.home input').val('');

	$('.home').fadeIn(3000, function() {
		$(this).find('input').focus();
	});

	$('.home input').off('change.home').on('change.home',function(e){
  	    var input = $(this);
		localStorage.setItem('mainFocus',input.val());

		input.hide();
		$('.home .mainFocus').show();
		$('.home .mainFocus p').html(input.val());
	});

	$('.home #btnClose').off('click.home').on('click.home', function(e){
			localStorage.removeItem('mainFocus');
			$('.home input').val("").show().focus();
			$('.home .mainFocus').hide();
	});
	
	updateTime();
	updateWeather();
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
function updateTime()
{
	// check for invalid user
	if (localStorage.getItem('username') == undefined)
	{
		showSetupPage();
		return;
	}

    // get current date
	var today = new Date();

	var hour = today.getHours();
	var minutes = today.getMinutes();

	$('.home h1').html(formatTime(hour) + ":" + formatTime(minutes));

	var period = hour < 12 ? 'morning' : (hour < 18 ? 'afternoon' : 'evening');

	$('.home h2').html('Good ' + period + ', ' + localStorage.getItem('username') + '.');

	// update the time information on the screen
	setTimeout(function() {
		updateTime()
	}, 1000);
}

// retrieves the background image from 'unsplash' website
function updateBackgroundImage()
{
	var unsplashUrl = "https://api.unsplash.com/photos/random?featured";
	var unsplashClientId = "a24e1fa3b77c93935f0552ebf6354a3540e9aa356caf80a1fcb55125fdb16110";
	var interval = 1*60*1000;

    $.getJSON(unsplashUrl + "&client_id=" + unsplashClientId, function(data)
	{
        // change data.urls.full to data.urls.regular for faster loading but
		// image quality will be slightly worse
        var photoUrl = data.urls.regular;
		$("body").css("background-image", "url(" + photoUrl + ")");
    })
	.fail(function() {
		$("body").css("background-image", "url(static.jpg)");
	})
	.always(function()
	{
		setTimeout(function(){
			updateBackgroundImage();
		}, interval);
	});
}

function updateWeather()
{
	var ipUrl = "https://ipapi.co/json/";
	var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
	var appId = "0ba1b50f1a3738d6071b91674041def7";
	var interval = 1*60*1000;

	// first JSON request to get the location
	$.getJSON(ipUrl, function(data)
	{
		// second JSON request to get the weather
		$.getJSON(weatherUrl + "q=" + data.city + "&units=metric&appid=" + appId, function(data)
		{
			$('.weather img').attr('src','http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
			$('.weather .temp').html(Math.round(data.main.temp) + '°C');
			$('.weather .city').html(data.name);
		})
		.always(function()
		{
			setTimeout(function(){
				updateWeather();
			}, interval);
		});
	});
}
