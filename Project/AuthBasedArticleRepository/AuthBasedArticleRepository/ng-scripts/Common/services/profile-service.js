// a factory to create a re-usable profile object
// we pass in a username and get back their synchronized data
app.factory("Profile", ["$firebaseArray",
  function ($firebaseArray) {
     
      return function (uid) {
          // create a reference to the database node where we will store our data
          var ref = firebase.database().ref("users/" + uid);
          
          // return it as a synchronized object
          return $firebaseArray(ref);
      }
  }
]);
