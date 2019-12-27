import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyC7vIjGwuSOdr0yDoMIKrgerPlWaL-yFLI',
  authDomain: 'dr-nadiv.firebaseapp.com',
  databaseURL: 'https://dr-nadiv.firebaseio.com',
  projectId: 'dr-nadiv',
  storageBucket: 'dr-nadiv.appspot.com',
  messagingSenderId: '268607776968',
  appId: '1:268607776968:web:3639471a5a4fd8f22fddfd',
  measurementId: 'G-P1KNZQTJ42'
}

export default () => {
  firebase.initializeApp(firebaseConfig)
}
