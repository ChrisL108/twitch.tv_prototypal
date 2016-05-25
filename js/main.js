


//--- Constructor for streamers
function Streamer(streamerName) {
	this.streamerName = streamerName;
};

//--- CREATE_USER
Streamer.prototype.createUser = function(name, info, logo, streaming) {

	let newListItem = "<li class='"+ streaming + "'>" +
					  "<img src ='"+ logo +"' class='user-logos'> " +
					  "<h4><a href='https://www.twitch.tv/" + name + "'>" +
					  name + "</a></h4>" +
					  "<span class='stream-info'>" + info +
					  "</span></li>";
	$("#streamers").prepend(newListItem);
};

//--- GET_USER
Streamer.prototype.getUser = function() {

	// getJSON for USER data
	$.getJSON(Streamer.prototype
					  .makeURL('users', this.streamerName), function(data) {

		// getJSON for user STREAM data
		var getStreamData = $.getJSON(
							  Streamer.prototype
							 		  .makeURL('streams', data.name), function(streamData) {

			// If user has no logo use avatar
			let userLogo = data.logo || "https://www.dropbox.com/s/fatgktf4x2lqk23/avatar.png?raw=1" ;
			let userName = data.display_name;
			let userBio = data.bio;
			
			// Check if user is streaming
			if (streamData.stream !== null) {
				var streaming = "online",
					streamInfo =  streamData.stream.game +
				        "---" + streamData.stream.channel.status;
			} else {
				var streaming = "offline",
					streamInfo = "Offline";
			}

			// send data to creatUser()
			Streamer.prototype.createUser(userName, streamInfo, userLogo, streaming);

		}); // end streamData
	}); // end data

};

//--- MAKE_URL
Streamer.prototype.makeURL = function(type, name) {
  return 'https://api.twitch.tv/kraken/' +
  		 type + '/' + name + '?callback=?';
}

// List of streamers to add
 let streamers = ["freecodecamp", "storbeck", "terakilobyte",
 "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff",
 "ESL_SC2", "OgamingSC2", "cretetion"];

// Create new array with streamer 'objects'
 var streamerMap = streamers.map(function(elem, index) {
 	var userToAdd = new Streamer(elem);
 	return userToAdd;
 });

// Call getUser() for each streamer object
streamerMap.forEach(function(elem) {
	elem.getUser();
});





