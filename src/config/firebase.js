import * as firebase from 'firebase' ;
var config = {
  apiKey: "AIzaSyBV03lO6aXC0gKD4lrlbnp_Cwd9Sy7aYAc",
  authDomain: "bulb-react-component.firebaseapp.com",
  databaseURL: "https://bulb-react-component.firebaseio.com",
  projectId: "bulb-react-component",
  storageBucket: "bulb-react-component.appspot.com",
  messagingSenderId: "375945778452"
};
 firebase.initializeApp(config);

  export default firebase ;