import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDectj7CsnhCv9wuAm9TNdO9o6LnbCd7nQ",
  authDomain: "product-management-fa3a9.firebaseapp.com",
  databaseURL: "https://product-management-fa3a9.firebaseio.com",
  projectId: "product-management-fa3a9",
  storageBucket: "product-management-fa3a9.appspot.com",
  messagingSenderId: "799509880651"
};

export default firebase.initializeApp(config);