$(document).ready(function(){


// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2-RGakh-PPWkcsDND744s8g7H5YWQMfM",
  authDomain: "super-train-station.firebaseapp.com",
  databaseURL: "https://super-train-station.firebaseio.com",
  storageBucket: "super-train-station.appspot.com",
  messagingSenderId: "243788238099"
};

firebase.initializeApp(config);

var database = firebase.database();

console.log(database);

//initialDataRetrieval();

function initialDataRetrieval(){
	database.ref("trains").once("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var dataId = childSnapshot.key;
			childSnapshot.forEach(function(childSnapshot2){
				var childKey = childSnapshot2.key;
				var childData = childSnapshot2.val();
				console.log(dataId, childKey, childData);
			})
		})
		var trainsObj = snapshot.val();
		console.log(trainsObj);
	})
}


$("#submit").on("click", function(event){
	event.preventDefault();
	var trainName = $("#trainName").val();
	var destination = $("#destination").val();
	var firstArrival = $("#firstArrival").val();
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


database.ref("trains").on("child_added", function(snap){
	console.log(snap.val());
	var trainName = snap.val().trainName;
	var destination = snap.val().destination;
	var firstArrival = snap.val().firstArrival;
	var frequency = snap.val().frequency;





	$("#trainSchedule").append(
		"<tr>" +
			"<td>"+trainName+"</td>"+
			"<td>"+destination+"</td>"+
			"<td>"+frequency+"</td>"+
		"</tr>")
});

//database.ref("trains").on("child_removed", function (snap){});

function validateTimeInput(timeInput){
	if (timeInput.length === 4){
	var isValidTime = /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9])|(24:?00))/.test(timeInput);
	return isValidTime;
	} else if (timeInput.length === 5){
		
	};
};


function nextArrivalTime(firstArrival, frequency){
	var firstArrivalTime = moment(new Date(firstArrival, "HH:mm"));
	console.log(firstArrivalMoment);

	var currentTime = moment();
	console.log(currentTime);

	var differenceInMinutes  
};




















});