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
    
    firebase.database().ref('/users').child(username).once('value').then(function(snapshot) {


    // If role is barber, query database for existing invite
    // Add a shop key value pair to identify which shop they work at using
    // shop's email split at @
    if (snapshot.exists() && role === "Barber" && snapshot.val().status === "inactive") {
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
           return res.status(200).send({message: "Success", username: username});
    } else if (!snapshot.exists() && role === "Barbershop") {
    var ref = firebase.database().ref('/users');
    ref.child(username).set({
        status: "inactive",
        name: name,
        email: email,
        password: password,
        role: role,
        username: username
       })
       return res.status(200).send({message: "Success", username: username});

    } else {
        return res.status(500).send({message: "You haven't been invited to this app"});
    }
})
        

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
                if (snapshot.val().status === 'active') {
                if (snapshot.val().role === "Barbershop") {
                    return res.status(200).send({message: "Success", role: snapshot.val().role, email: email, name: snapshot.val().name, username: username, phone: snapshot.val().phone});
                } else {
                    return res.status(200).send({message: "Success", role: snapshot.val().role, email: email, name: snapshot.val().name, username: username, shopEmail: snapshot.val().shopEmail});
                }
                } else {
                    return res.status(500).send({message: "account inactive"});
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
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: "fadelistapplication@outlook.com",
        pass: "Habteab1"
    },
    tls: {
        ciphers:'SSLv3'
    }
});
        
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

        console.log("shopEmail: " + shopEmail)
        console.log("email: " + email)
   

        firebase.database().ref('/users/').child(username).once('value').then(function(snapshot) {

        if (!snapshot.exists()) {
            console.log('Account doesnt exist')
            var ref = firebase.database().ref('/users');
            ref.child(username).set({
                email: email,
                status: status,
                shopEmail: shopEmail
            })
            var mailOptions = {
                from: 'fadelistapplication@outlook.com',
                to: email,
                subject: "You've Been Invited!",
                text: 'Your Barbershop has invited you to use the FadeList mobile application (the number one waitlist app). Please click here to download and signup!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return res.status(500).send({message: "Account Exists"});
                } else {
                  console.log('Email sent: ' + info.response);
                 return res.status(200).send({message: "Success"});
                }
              });
        } else {
            console.log('Account Exists')
          return res.status(500).send({message: "Account Exists"});
        }
        })
            
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
        console.log("Shop Email " + shopEmail)
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
    },



    completeBarbershopSignup(req, res) {

        const stripe = require("stripe")("sk_live_NXBBNAswnpyuWIeptXmHs6zW00vtAuN1lT");
        var token = req.body.token
        var areaCode = req.body.zipCode
        var username = req.body.username
        // Get on stripe and create account + membership
        // User card token to 1) Create Customer 2) Subscribe them to Stripe-defined Subscription plan 3) Process payment IMMEDIATELY
        // Use customer ID from Stripe response and save to firebase
        // Once payment is processed, implement Twilio API to purchase number and save to firebase
        // If all is successful, change barbershop status to "active" and render message to webpage
        // Success message should say the payment has been processed, blah blah

        // stripe.customers.create({
        //     source: token
        //   }, function(err, customer) {
        //     var customerZip = customer
        //      stripe.subscriptions.create({
        //    customer: customer.id,
        //    items: [
        //      {
        //        plan: "plan_Fp5tfqu1NVrcvL"
        //      }
        //    ]
        //  }, function(err, subscription) {
        //      // Purchase phone number here
        //      return res.status(200).send({message: "Success"});
        //    }
        //  );
        //     })

        const accountSid = 'ACa76d8d56714594b83c8158acfdb6ed9c';
        const authToken = 'f28300660b1522e871b55efe9abc8228';
        const client = require('twilio')(accountSid, authToken);


        

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
    var ref = firebase.database().ref('/users');
  
            //console.log(userSnapshot.val().email)
                stripe.customers.create({
                    source: token
                  }, function(err, customer) {
                      var stripeID = customer.id
                     stripe.subscriptions.create({
                   customer: customer.id,
                   items: [
                     {
                       plan: "plan_Fp5tfqu1NVrcvL"
                     }
                   ]
                 }, function(err, subscription) {
                    client.availablePhoneNumbers('US')
                    .local
                    .list({areaCode: areaCode, limit: 1})
                    .then(local => local.forEach(l =>
                        client.incomingPhoneNumbers
                  .create({phoneNumber: l.friendlyName, smsUrl: "https://barbershop-app-react-node.herokuapp.com/receiveText"})
                  .then(incoming_phone_number => 
                    // Save phone number, phone number ID, and Stripe ID to barbershop acct, set acct to active
                     
        // var shopEmail = snapshot.val().shopEmail
                    ref.child(username).update({
                        phone: l.friendlyName,
                        phoneID: incoming_phone_number.sid,
                        stripeID: stripeID,
                        status: "active"
                    })
                    )))
                    return res.status(200).send({message: "Success"});
                    
                   }
                 );
                    })



    
    },

    changeBilling(req, res) {

        const stripe = require("stripe")("sk_live_NXBBNAswnpyuWIeptXmHs6zW00vtAuN1lT");
        var token = req.body.token
        var username2 = req.body.username
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

    firebase.database().ref('/users').child(username2).once('value').then(function(snapshot) {
        var customerId = snapshot.val().stripeID
        console.log('customerId: ' + customerId)
     
                stripe.customers.listCards(
                    customerId, function(err, cards) {
    
                    /*This "if" statement basically says to check if the user
                    has a card on file. If so, continue to update it. If not,
                    then send the message 'You dont have a card on file'
                    */
                   console.log('cards: ' + cards)
                     if (cards.data[0]) {
                        
                        const cardId = cards.data[0].id
                    
                   
                    
                       /* STEP THREE:
                        Use both the Customer ID and Credit Card ID to Delete the Credit Card
                        */  
                        stripe.customers.deleteCard(
                            customerId,
                            cardId,
                            function(err, confirmation) {
                                }
                                );
                        
                         
                        /* STEP FOUR:
                        Add a new Credit Card using the tokenized information, thus completing our update
                        */
                        stripe.customers.createSource(
                            customerId,
                            { card: token },
                            function(err, card) {
                                res.status(201).send({ 
                                    message: 'Success'
                                    })
                            }
                            );
                        
                        
                    } else {
                        res.status(500).send({
                            message: 'Error: You do not have a card on file to update!'
                                })
                           }
                        
            })
        })       
    
    },

    cancelMembership(req, res) {
        const stripe = require("stripe")("sk_live_NXBBNAswnpyuWIeptXmHs6zW00vtAuN1lT");
        var username = req.body.username
        var email = req.body.email
        var reason = req.body.reason
        var firebase = require('firebase');
        const accountSid = 'ACa76d8d56714594b83c8158acfdb6ed9c';
        const authToken = 'f28300660b1522e871b55efe9abc8228';
        const client = require('twilio')(accountSid, authToken);

    
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

    firebase.database().ref('/users').child(username).once('value').then(function(snapshot) {
        var customerId = snapshot.val().stripeID
        var phoneNumberSID = snapshot.val().phoneID

        var ref = firebase.database().ref('/users');

        client.incomingPhoneNumbers(phoneNumberSID).remove(function(err, deleted) {
            if (err){
                res.status(500).send({ 
                    message: 'Error'
                    })
            } else {
              console.log('Deleted from Twilio');
              stripe.customers.del(
                customerId,
                function(err, confirmation) {
                    ref.child(username).remove()
                    var ref2 = firebase.database().ref('/Reasons');
                    ref2.child(username).set({
                        email: email,
                        reason: reason
                    })
                    res.status(201).send({ 
                        message: 'Success'
                        })
                }
              );
            }
        });
    })


    
}

}