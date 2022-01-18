
// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";

const firebaseConfig = {
  //your API Keys
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();