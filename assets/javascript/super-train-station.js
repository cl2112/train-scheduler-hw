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

	$("#trainSchedule").append("<div><h1>"+trainName+"</h1><p></p></div>")
});




























});