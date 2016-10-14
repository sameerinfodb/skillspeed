// a factory to create a re-usable profile object
// we pass in a username and get back their synchronized data
app.factory("ArticlePersistenceService", ["$firebaseArray",
  function ($firebaseArray) {

      return function (uid) {
          // create a reference to the database node where we will store our data
          var ref = firebase.database().ref("articles/" + uid);

          // return it as a object
          return $firebaseArray(ref);
      }
  }
]);
