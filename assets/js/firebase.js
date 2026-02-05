// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDs6JHPSV8UM2uKSSVUA1SNxWGyxAihaII",
  authDomain: "mockup-master-db.firebaseapp.com",
  databaseURL: "https://mockup-master-db-default-rtdb.firebaseio.com",
  projectId: "mockup-master-db",
  storageBucket: "mockup-master-db.appspot.com",
  messagingSenderId: "68063883147",
  appId: "1:68063883147:web:07debadc7efe4aeccac98e"
};

// INIT
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

