


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
  var database = firebase.database();

  //Listen for add train button
  $("#add-train-button").on("click", function(event) 
  {
    //prevents page reload//
    event.preventDefault();
    //create varibles for train data and capture via the input IDs//
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    
    
      // Create  object for new train data//
  var newTrain = 
  {
    name: trainName,
    destination: trainDestination,
    trainOne: firstTrain,
    frequency: trainFrequency,
  };
   // Uploads new train data to firebase//
   database.ref().push(newTrain);

    // Alert
  alert("New train has been added to the schedule");

  // Clear text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

})

//Firebase event for adding train to the database and in table above entry
database.ref().on("child_added", function(childSnapshot, prevChildKey)
 {
        
    // Store in a variables.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().trainOne;
    var trainFrequency = childSnapshot.val().frequency;
    
  
        // var nextArrival = start time pluss frequency = moments of arrival. closet interal in future is next arrival. 
        // var minutesAway = next arrival - now or from now to next arrival........ moment().startOf('hour').fromNow();
        var currentTime = moment();
        var firstTrainYearAgo = moment(firstTrain, "HH:mm").subtract(1, "years");
        var timeDiff = moment().diff(firstTrainYearAgo, "minutes");
        var minDivFreq = timeDiff % trainFrequency;
        var minutesAway = trainFrequency - minDivFreq;
        var nextTrain = moment().add(minutesAway, "minutes");
        
         // Add  each  train's data into the table above input
        $("#train-schedule> tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + minutesAway + "</td><td>");
});

