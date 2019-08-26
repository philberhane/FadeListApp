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

    firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {



    // If role is barber, query database for existing invite
    // Add a shop key value pair to identify which shop they work at using
    // shop's email split at @
    if (snapshot.val()!==null && role === "Barber" && snapshot.val().status === "inactive") {
        var ref = firebase.database().ref('/users');
        ref.child(username).set({
            name: name,
            email: email,
            password: password,
            role: role,
            status: "active"
           })
    } else if (snapshot.val()===null && role === "Barbershop") {

    var ref = firebase.database().ref('/users');
    ref.child(username).set({
        name: name,
        email: email,
        password: password,
        role: role
       })

    } else {
        return res.status(500).send({message: "You haven't been invited to this app"});
    }
})
        
      
    
    
    return res.status(200).send({message: "Success"});

},

    login(req, res) {
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
   
    var email = req.body.email;
    var password = req.body.password;
    var username = email.split("@")[0];

    if (firebase.database().ref('/users/' + username)) {
        firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
            if (snapshot.val()!==null && snapshot.val().password === password) {

                return res.status(200).send({message: "Success", role: snapshot.val().role, email: email, name: snapshot.val().name, username: username});

            } else {
                return res.status(500).send({message: "invalid password"});
            }
          });

    } else {
        return res.status(500).send({message: "No account exists"});
    }
    



    },




    invite(req, res) {
    
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
    
        var email = req.body.email;
        var status = "inactive";
        var username = email.split("@")[0];
        var shopEmail = req.body.shopEmail;
        
    
        // Check if user exists with given username and email
        // If not, create one with above values and send email to user saying they've been invited, then success message
        // If user exists, send error message
        // IF email fails, send error message
        
        // if (firebase.database().ref('/users/' + username) && role === "Barber" && firebase.database().ref('/users/' + username + "/status") === "inactive") {
        //     var ref = firebase.database().ref('/users');
        //     ref.child(username).set({
        //         name: name,
        //         email: email,
        //         password: password,
        //         role: role,
        //         status: "active"
        //        })
        // } else if (!firebase.database().ref('/users/' + username) && role === "Barbershop") {
    
        // var ref = firebase.database().ref('/users');
        // ref.child(username).set({
        //     name: name,
        //     email: email,
        //     password: password,
        //     role: role
        //    })
    
        // } else {
        //     res.status(500).send({message: "You haven't been invited to this app"});
        // }

        firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
            if (snapshot.val()===null) {
                var ref = firebase.database().ref('/users');
                ref.child(username).set({
                    email: email,
                    status: status,
                    shopEmail: shopEmail
                })
                return res.status(200).send({message: "Success"});
            } else {
                return res.status(200).send({message: "Account Exists"});
            }
        })
            
          
        
        
        res.status(200).send({message: "Success"});
    
    },

    receiveText(req, res) {
        console.log(req.body.Body); // the message body
        console.log(req.body.From);
        res.status(200).send({message: "Success"});

    }
    

    
}