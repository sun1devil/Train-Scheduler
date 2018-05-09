

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
var config = {
    apiKey: "AIzaSyADjokRR--WDd34JPMIhDPJaHB2t1TePMo",
    authDomain: "train-scheduler-ae6c7.firebaseapp.com",
    databaseURL: "https://train-scheduler-ae6c7.firebaseio.com",
    projectId: "train-scheduler-ae6c7",
    storageBucket: "train-scheduler-ae6c7.appspot.com",
    messagingSenderId: "19953914149"
  };
  firebase.initializeApp(config);
//   variable to reference firebase
  var database = firebase.database()

  //Listen for add train button
  $("#add-train-button").on("click", function(event) 
  {
    //prevents page reload//
    event.preventDefault();
    //create varibles for train data and capture via the input IDs//
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

      // Creates local "temporary" object for holding employee data//
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    trainOne: firstTrain,
    frequency: trainFrequency,
  };
   // Uploads new train data to the database//
   database.ref().push(newTrain);

   // Logs everything to console//
   console.log(newTrain.trainName);
   console.log(newTrain.trainDestination);
   console.log(newTrain.firstTrain);
   console.log(newTrain.trainFrequency);

   // Alert
  alert("New train has been added to the schedule");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

})