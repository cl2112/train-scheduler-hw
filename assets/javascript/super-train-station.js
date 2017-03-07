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

firebase.initializeApp(config);

//========================================================================================



//----------------------------------------------------------------------------------------
// Global Variables

var database = firebase.database();

var baselineDateString = "12-12-12"

var firstArrivalDateString = "11-12-12"

var baselineDate = moment(new Date(baselineDateString));

//========================================================================================



//----------------------------------------------------------------------------------------
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
	// Store the train properties from the database
	var trainName = snap.val().trainName;
	var destination = snap.val().destination;
	var firstArrival = snap.val().firstArrival;
	var frequency = snap.val().frequency;
	console.log(trainName, destination, firstArrival, frequency);

	// Create the moment objects to be used in the time calculations.
	var firstArrivalMoment = moment(new Date(firstArrivalDateString+ " " + firstArrival));
	var currentTime = moment().format("HH:mm");
	var currentTimeMoment = moment(new Date(baselineDateString+" "+currentTime));
	console.log("firstArrivalMoment",firstArrivalMoment.format("HH:mm"));
	console.log("currentTime",currentTime);

	// Time calculations
	var timeDifferenceInMinutes = currentTimeMoment.diff(firstArrivalMoment, "minutes");
	console.log("timeDifferenceInMinutes",timeDifferenceInMinutes);

	var minutesOffFromNearestArrival = timeDifferenceInMinutes % frequency;
	console.log("minutesToNextArrival",minutesToNextArrival);


	var minutesToNextArrival = frequency - minutesOffFromNearestArrival;
	console.log("minutesToNextArrival 3",minutesToNextArrival);
	var nextArrvialTime = currentTimeMoment.add(minutesToNextArrival, "minutes").format("HH:mm");
	console.log("nextArrvialTime",nextArrvialTime);
	
	

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
// Check to see if the time grabbed from the form is formatted correctly. Returns Boolean.

function validateTimeInput(timeInput){
	var isValidTime = /^(((([0-1][0-9])|(2[0-3])):[0-5][0-9])|(24:00))/.test(timeInput);
	return isValidTime;
};
//=============================================================================================





















});