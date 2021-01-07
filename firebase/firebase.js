var firebase = require("firebase/app");

require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyBOQYVPKxEhd4qF0NXEnrqXQzMTJvfmGls",
  authDomain: "temperature-catalunia.firebaseapp.com",
  databaseURL:
    "https://temperature-catalunia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "temperature-catalunia",
  storageBucket: "temperature-catalunia.appspot.com",
  messagingSenderId: "749669114352",
  appId: "1:749669114352:web:11866e8b0d4c95ed54bd35",
  measurementId: "G-KCV2CFQKYC",
};

firebase.initializeApp(firebaseConfig);

exports.saveRegistry = (path, data) => {
  var newValueKey = firebase.database().ref(path).child('history').push().set(data);
//   var newValueKey = firebase.database().ref().child(path).push().key;
//   var updates = {};
//   updates[`${path}/${newValueKey}`] = data;
//   return firebase.database().ref().update(updates);
};

// function writeNewPost(uid, username, picture, title, body) {

//     // Get a key for a new Post.
//     var newValueKey = firebase.database().ref().child(path).push().key;

//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates[`${path}/${newValueKey}`] = data;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//     return firebase.database().ref().update(updates);
//   }

// module.exports = saveRegistry;
