


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
    // var timeArray  = firstTrain.split(":");
    // var minutes = timeArray[1]
    console.log(firstTrain);
    // console.log(firstTrain.split(":"));
    // console.log(minutes);
    
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

   // Logs  data//
  //  console.log(newTrain.name);
  //  console.log(newTrain.destination);
  //  console.log(newTrain.trainOne);
  //  console.log(newTrain.frequency   );

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
    // console.log(childSnapshot.val());
    
    // Store in a variables.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().trainOne;
    var trainFrequency = childSnapshot.val().frequency;
  //   var time =moment().format(firstTrain)
  
  // console.log(time)
        //log data//
        // console.log(trainName);
        // console.log(trainDestination);
        // console.log(firstTrain);git
        // console.log(trainFrequency);

        // var nextArrival = start time pluss frequency = moments of arrival. closet interal in future is next arrival. 
        // var minutesAway = next arrival - now or from now to next arrival........ moment().startOf('hour').fromNow();
        var currentTime = moment();
        var firstTrainYearAgo = moment(firstTrain, "HH:mm").subtract(1, "years");
        // console.log(firstTrain)
        // console.log(firstTrainYearAgo)
        // console.log(moment().format("HH:mm"));
        // console.log(firstTrainYearAgo.format("HH:mm"));
        var timeDiff = moment().diff(firstTrainYearAgo, "minutes");
        // console.log("math")
        // console.log(timeDiff);
        // console.log(trainFrequency);
        var minDivFreq = timeDiff % trainFrequency;
        // console.log(minDivFreq);
        var minutesAway = trainFrequency - minDivFreq;
        var nextTrain = moment().add(minutesAway, "minutes");
        
        


        // Add  each  train's data into the table above input
        $("#train-schedule> tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + minutesAway + "</td><td>");
});

