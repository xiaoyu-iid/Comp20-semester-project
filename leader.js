myLat = 1000;
myLng = 1000;

$( document ).ready(function() {
    $("#global").click(function() {
		global_rank();
	});

	$("#local").click(function() {
		getLocation();
	});
});


function global_rank () {
	$("#global").addClass("active");
	$("#local").removeClass("active");
	$("#mytable").empty();
	$.get("https://immense-plateau-64166.herokuapp.com/scores.json", function(data){
		data_array = JSON.parse(data);
		var html = "<thead><tr><th>Username</th><th>Score</th><th>Time</th></tr></thead><tbody>";
		for (i=0 ; i< data_array.length; i++){

			html += "<tr>";
			html += '<td>' + data_array[i].username + '</td>';
			html += '<td>' + data_array[i].score + '</td>';
			html += '<td>' + data_array[i].created_at + '</td>';
			html += '</tr>';
		} 
		html += "</tbody>";
		$('#mytable').append(html);
		$("#winner").html(data_array[0].username);
	});
}


function local_rank () {
	$.get("https://immense-plateau-64166.herokuapp.com/scores.json", function(data){
		data_array = JSON.parse(data);
		var winner = "";
		var html = "<thead><tr><th>Username</th><th>Score</th><th>How far from me (miles)</th></tr></thead><tbody>";
		for (i=0 ; i< data_array.length; i++){

			user_latitude = parseFloat(data_array[i].latitude);
			user_longitude = parseFloat(data_array[i].longitude);
			distance = calc_dist({latitude: myLat, longitude: myLng}, {latitude: user_latitude, longitude: user_longitude});
		    distance = Math.round(distance*1000)/1000;

			if (distance < 50) {
				html += "<tr>";
				html += '<td>' + data_array[i].username + '</td>';
				html += '<td>' + data_array[i].score + '</td>';
				html += '<td>' + distance + '</td>';
				html += '</tr>';
				if (winner == "") {
					winner = data_array[i].username;
				}
			}
		} 
		html += "</tbody>";
		$("#winner").html(winner);
		$("#mytable").empty();
		$('#mytable').append(html);
	});
}


function calc_dist (me, user){
	var R = 3959; // Earth’s mean radius in miles
  	var d_lat = rad(user.latitude - me.latitude);
  	var d_long = rad(user.longitude - me.longitude);
  	var a = Math.sin(d_lat / 2) * Math.sin(d_lat / 2) +
    	Math.cos(rad(me.latitude)) * Math.cos(rad(user.latitude)) *
    	Math.sin(d_long / 2) * Math.sin(d_long / 2);
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  	var d = R * c;
  	return d; // returns the distance in miles
}

var rad = function(x) {
	return x * Math.PI / 180;
};

window.onload = global_rank;

function getLocation () {
	$("#local").addClass("active");
	$("#global").removeClass("active");
	$("#mytable").empty();
	var html = "<thead><tr><th>Username</th><th>Score</th><th>How far from me (miles)</th></tr></thead><tbody>";
	html += "<tr><td>Loading...</td><td>Loading...</td><td>Loading...</td></tr></tbody>";
	$('#mytable').append(html);

	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position){
    		myLat = position.coords.latitude;
    		myLng = position.coords.longitude;
    		local_rank();
    		
    	});       	
	}
}
