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
    var email = req.body.email.toLowerCase();
    var password = req.body.password;
    var role = req.body.role;
    var username = email.split("@")[0];

    firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {



    // If role is barber, query database for existing invite
    // Add a shop key value pair to identify which shop they work at using
    // shop's email split at @
    if (snapshot.val()!==null && role === "Barber" && snapshot.val().status === "inactive") {
        var ref = firebase.database().ref('/users');
        var shopEmail = snapshot.val().shopEmail
        ref.child(username).set({
            shopEmail: shopEmail,
            name: name,
            email: email,
            password: password,
            role: role,
            status: "active",
            username: username
           })
    } else if (snapshot.val()===null && role === "Barbershop") {

    var ref = firebase.database().ref('/users');
    ref.child(username).set({
        name: name,
        email: email,
        password: password,
        role: role,
        username: username
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
   
    var email = req.body.email.toLowerCase();
    var password = req.body.password;
    var username = email.split("@")[0];
    console.log(email)

    if (firebase.database().ref('/users/' + username)) {
        firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
            if (snapshot.val()!==null && snapshot.val().password === password) {
                if (snapshot.val().role === "Barbershop") {
                    return res.status(200).send({message: "Success", role: snapshot.val().role, email: email, name: snapshot.val().name, username: username});
                } else {
                    return res.status(200).send({message: "Success", role: snapshot.val().role, email: email, name: snapshot.val().name, username: username, shopEmail: snapshot.val().shopEmail});
                }

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
    
        var email = req.body.email.toLowerCase();
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


        console.log(req.body); // the message body
       console.log(req.body.From);
       console.log(req.body.Body);
       firebase.database().ref('/users/').once('value').then(function(userSnapshot) {
        userSnapshot.forEach(function(userSnapshot) {
             if (userSnapshot.val().phone) {
                 var phone = userSnapshot.val().phone.split(' ')
                 var phoneNumber = phone[0] + phone[1] + phone[2] + phone[3]
                if (phoneNumber === req.body.To) {
                    if (userSnapshot.val().waitlist) {
                    var ref = firebase.database().ref('/users/'+userSnapshot.val().username);
                    console.log(userSnapshot.val().waitlist)
                    var arrayOfCuts = userSnapshot.val().waitlist
                    console.log(typeof(arrayOfCuts))
                    var obj = {
                        cut: req.body.Body,
                        number: req.body.From
                    }
                    arrayOfCuts.arrayOfCuts.push(obj)
                    ref.child('waitlist').set({
                        arrayOfCuts: arrayOfCuts.arrayOfCuts
                    });
                } else {
                    var arrayOfCuts = []
                    var obj = {
                        cut: req.body.Body,
                        number: req.body.From
                    }
                    arrayOfCuts.push(obj)
                    var ref = firebase.database().ref('/users/'+userSnapshot.val().username);
                    ref.child('waitlist').set({
                        arrayOfCuts: arrayOfCuts
                    });
                }
                }
             }
        })
    })


        res.send(`<Response></Response>`);

    },

    sendText(req, res) {

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

        // Req must include barber's barbershop
        var shopEmail = req.body.shopEmail
        var name = req.body.name
        var username = shopEmail.split("@")[0];
        //console.log("Shop Email " + shopEmail)
        // Find barbershop in firebase
        firebase.database().ref('/users/').once('value').then(function(userSnapshot) {
            userSnapshot.forEach(function(userSnapshot) {
                //console.log(userSnapshot.val().email)
                 if (userSnapshot.val().email === shopEmail) {
                    if (userSnapshot.val().waitlist) {
                var fromPhone = userSnapshot.val().phone
                var arrayOfCuts = userSnapshot.val().waitlist.arrayOfCuts
                var toPhone = arrayOfCuts[0].number
                var cutDescription = arrayOfCuts[0].cut
                console.log(userSnapshot.val())
                console.log(userSnapshot.val().waitlist.arrayOfCuts)
                
                arrayOfCuts.shift()
                var ref = firebase.database().ref('/users/'+userSnapshot.val().username);
                ref.child('waitlist').set({
                    arrayOfCuts: arrayOfCuts
                });
                const accountSid = 'ACa76d8d56714594b83c8158acfdb6ed9c';
                const authToken = 'f28300660b1522e871b55efe9abc8228';
                const client = require('twilio')(accountSid, authToken);

                client.messages
                .create({
                    body: "It's your turn for a cut! " + name + " will be cutting your hair. Please arrive at the barbershop within 10 minutes or risk being skipped.",
                    from: fromPhone,
                    to: toPhone
                })
                .then(message => console.log(message.sid));
                return res.status(200).send({message: "Success", number: toPhone, cut: cutDescription});
                        } else {
                            return res.status(200).send({message: "The waitlist is currently empty"});
                        } }
                    })
        })
        // Get snapshot
        // Save barbershops number to variable
        // Pull waitlist
        // Save user number and cut to variables
        // pop waitlist beginning and save to firebase
        // send number and type of cut back to barber
        // send text message to number

    


    },

    getWaitlist(req, res) {

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

        // Req must include barber's barbershop
        var shopEmail = req.body.shopEmail
        var name = req.body.name
        var username = shopEmail.split("@")[0];
        //console.log("Shop Email " + shopEmail)
        // Find barbershop in firebase
        firebase.database().ref('/users/').once('value').then(function(userSnapshot) {
            userSnapshot.forEach(function(userSnapshot) {
                //console.log(userSnapshot.val().email)
                 if (userSnapshot.val().email === shopEmail) {
                     if (userSnapshot.val().waitlist) {
                var arrayOfCuts = userSnapshot.val().waitlist.arrayOfCuts
                return res.status(200).send({message: arrayOfCuts});
                        } else {
                            return res.status(500).send({message: "The waitlist is currently empty"});
                        }
                    
                    }
                    })
        })
        // Get snapshot
        // Save barbershops number to variable
        // Pull waitlist
        // Save user number and cut to variables
        // pop waitlist beginning and save to firebase
        // send number and type of cut back to barber
        // send text message to number

    


    },

    getBarbers(req, res) {

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

        // Req must include barber's barbershop
        var shopEmail = req.body.shopEmail

        var userArray = []
        
        //console.log("Shop Email " + shopEmail)
        // Find barbershop in firebase
        firebase.database().ref('/users/').once('value').then(function(userSnapshot) {
            userSnapshot.forEach(function(userSnapshot) {
                //console.log(userSnapshot.val().email)
                 if (userSnapshot.val().shopEmail === shopEmail) {
                    var user = {
                        email: userSnapshot.val().email,
                        name: userSnapshot.val().name
                    }
                    userArray.push(user)
                    }


                    })
                    if (userArray.length > 0) {
                        return res.status(200).send({message: userArray});
                    } else {
                        return res.status(500).send({message: "Error: There are no users"});
                    }


        })
        // Get snapshot
        // Save barbershops number to variable
        // Pull waitlist
        // Save user number and cut to variables
        // pop waitlist beginning and save to firebase
        // send number and type of cut back to barber
        // send text message to number

    


    },

    deleteBarber(req, res) {
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
    var username = email.split("@")[0];

    var ref = firebase.database().ref('/users');
    ref.child(username).remove()
    return res.status(200).send({message: "The barber has been deleted"});
    }

    

    
}