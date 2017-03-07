$(document).ready(function(){

//-------------------------------------------------------------------------------------
// Initialize Firebase

var config = {
  apiKey: "AIzaSyA2-RGakh-PPWkcsDND744s8g7H5YWQMfM",
  authDomain: "super-train-station.firebaseapp.com",
  databaseURL: "https://super-train-station.firebaseio.com",
  storageBucket: "super-train-station.appspot.com",
  messagingSenderId: "243788238099"
};
//========================================================================================

firebase.initializeApp(config);

var database = firebase.database();

console.log("database", database);

var baselineDateString = "12-12-12"

var baselineDate = moment(new Date(baselineDateString));

console.log("baselineDate===", baselineDate.format("LLL"));


//--------------------------------------------------------------------------------------
// Click event for input submission.

$("#submit").on("click", function(event){
	event.preventDefault();
	var trainName = $("#trainName").val();
	var destination = $("#destination").val();
	var firstArrival =$("#firstArrival").val();
	var frequency = $("#frequency").val();

	if (validateTimeInput(firstArrival) === true){
		console.log("validated time input");

	} else {
		return console.log("time not vaild");
	}

	console.log(trainName, destination, firstArrival, frequency);
	database.ref("trains").push({
		trainName:trainName,
		destination:destination,
		firstArrival:firstArrival,
		frequency:frequency
	});
});
//=========================================================================================


//------------------------------------------------------------------------------------------
//Display train info

database.ref("trains").on("child_added", function(snap){
	//console.log(snap.val());
	var trainName = snap.val().trainName;
	var destination = snap.val().destination;
	var firstArrival = snap.val().firstArrival;
	var frequency = snap.val().frequency;


	var firstArrivalMoment = moment(new Date(baselineDateString+ " " + firstArrival));

	console.log(firstArrivalMoment.format("LLL"));

	console.log(firstArrivalMoment.from(baselineDate));

	var currentTime = moment().format("HH:mm");
	console.log(currentTime);

	var currentTimeMoment = moment(new Date(baselineDateString+" "+currentTime));
	console.log("currentTimeMoment", currentTimeMoment.format("LLL"));
	console.log("difference between firstArrival and currentTime",firstArrivalMoment.diff(currentTimeMoment, "minutes"));

	var timeDifferenceInMinutes = currentTimeMoment.diff(firstArrivalMoment, "minutes");
	console.log(timeDifferenceInMinutes);

	var minutesToNextArrival = timeDifferenceInMinutes % frequency;

	console.log("minutesToNextArrival",minutesToNextArrival);

	if (minutesToNextArrival > 0){
		var nextArrvialTime = currentTimeMoment.add(minutesToNextArrival, "minutes").format("HH:mm");
	} else {
		var nextArrvialTime = currentTimeMoment.subtract(minutesToNextArrival, "minutes").format("HH:mm");
		var minutesToNextArrival = minutesToNextArrival * -1;
	}
	

	console.log(nextArrvialTime);

	$("#trainSchedule").append(
		"<tr>" +
			"<td>"+trainName+"</td>"+
			"<td>"+destination+"</td>"+
			"<td>"+frequency+"</td>"+
			"<td>"+nextArrvialTime+"</td>"+
			"<td>"+minutesToNextArrival+"</td>"+
		"</tr>")
});
//===============================================================================================





//--------------------------------------------------------------------------------------------
// Check to see if the time that was grabbed from the form is formatted correctly.

function validateTimeInput(timeInput){
	var isValidTime = /^(((([0-1][0-9])|(2[0-3])):[0-5][0-9])|(24:00))/.test(timeInput);
	return isValidTime;
};
//=============================================================================================





















});