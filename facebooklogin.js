//need to come back and re-work on this because we need a server system creating an app in order to use facebook


//function called with the results from FB.getLoginStatus()
function statusChangeCallback(response) {

		if (response.status === 'connected'){
			//logged into your app and facebook
			testAPI();
		} else if (response.status === 'not_authorized'){
			document.getElementById('login').innerHTML = "Please log into Facebook";
		} else {
			document.getElementById('login').innerHTML = "Please log into Facebook";
		}
}

//function is called when someone finishes with login button

function checkLoginState(){
	FB.getLoginStatus(function(response){
		statusChangeCallback(response);
	});
}

window.fbAsynInic = function(){
	FB.init({
		appId : '{your-app-id}',
		cookie : true,
		xfbml : true,
		version : 'vs.8'
	});

	FB.getLoginStatus(function(response){
			statusChangeCallback(response);
	});
}

//load SDK asynchronously
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBofore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//testeing function
function testAPI(){
	console.log('Hi, We are successfully fetching....');
	FB.api('/me', function(response){
		console.log('Successful login for: ' + response.name);
		document.getElementById('login').innerHTML = 'Thanks for log in';

	});
}

