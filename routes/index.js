module.exports = {

    
   sayHello(req, res) {
    
    var firebase = require('firebase');
    
    var firebaseConfig = {
        apiKey: "AIzaSyAaX_NmPwK2_K1E6Azmj5PFaOw5KhJsJfY",
        authDomain: "nodebarbershopdatabase.firebaseapp.com",
        databaseURL: "https://nodebarbershopdatabase.firebaseio.com",
        projectId: "nodebarbershopdatabase",
        storageBucket: "",
        messagingSenderId: "393042645396",
        appId: "1:393042645396:web:14b67934e1b60a69"
      };
      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
      var ref = firebase.database().ref('/');
      var userRef = ref.child('users');
        // Create a new ref and log it’s push key
        userRef.child("Philberhane@yahoo.com").set({
        name: 'Christopher',
        description: 'I eat too much ice cream'
       })

        
      
    var name = req.body.name;
    
    res.status(200).send({message: "Hello " + name});

}
    

    
}