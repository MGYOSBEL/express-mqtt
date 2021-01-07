var firebase = require('firebase/app');


require('firebase/database');

var firebaseConfig = {
  apiKey: "AIzaSyBOQYVPKxEhd4qF0NXEnrqXQzMTJvfmGls",
  authDomain: "temperature-catalunia.firebaseapp.com",
  databaseURL: "https://temperature-catalunia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "temperature-catalunia",
  storageBucket: "temperature-catalunia.appspot.com",
  messagingSenderId: "749669114352",
  appId: "1:749669114352:web:11866e8b0d4c95ed54bd35",
  measurementId: "G-KCV2CFQKYC"
};

firebase.initializeApp(firebaseConfig);

exports.saveRegistry = (path, data) => {
    firebase.database().ref(path).set(data);  
}


// module.exports = saveRegistry;
