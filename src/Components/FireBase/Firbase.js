import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyANHbBfQCQ-6AMhlrikgSQo8NE9fLrbV34",
    authDomain: "onduty-dev.firebaseapp.com",
    projectId: "onduty-dev",
    storageBucket: "onduty-dev.appspot.com",
    messagingSenderId: "705750599750",
    appId: "1:705750599750:web:9c6d9c3c2bfedc9b106247"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase


  export const db = firebase.firestore()
  export const storage = firebase.storage()

  export const students = db.collection('Students')
  export const teachers = db.collection('Teachers')
  export const studentForms = db.collection('studentForms')
  export const teacherForms = db.collection('teacherForm')
  export const departments = db.collection('Department')