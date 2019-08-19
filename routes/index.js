module.exports = {

    
   signUp(req, res) {
    
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
    // Add a shop key value pair to identify which shop they work at using
    // shop's email split at @
    if (firebase.database().ref('/users/' + username) && role === "Barber" && firebase.database().ref('/users/' + username + "/status") === "inactive") {
        var ref = firebase.database().ref('/users');
        ref.child(username).set({
            name: name,
            email: email,
            password: password,
            role: role,
            status: "active"
           })
    } else if (!firebase.database().ref('/users/' + username) && role === "Barbershop") {

    var ref = firebase.database().ref('/users');
    ref.child(username).set({
        name: name,
        email: email,
        password: password,
        role: role
       })

    } else {
        res.status(500).send({message: "You haven't been invited to this app"});
    }
        
      
    
    
    res.status(200).send({message: "Success"});

}
    

    
}