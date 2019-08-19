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

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var username = email.split("@")[0];

    // If role is barber, query database for existing invite
      var ref = firebase.database().ref('/users');
      ref.child(username).set({
        name: name,
        email: email,
        password: password,
        role: role,
        shop: shop ? shop : null
       })


        
      
    
    
    res.status(200).send({message: "Hello " + name});

}
    

    
}