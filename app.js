    
const dotenv = require('dotenv').config();
const express = require('express');
const errorhandler = require('errorhandler');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
var nodemailer = require('nodemailer');
var fs = require('fs');
var expressValidator = require('express-validator');




let app = express()
//app.use(express.static('../client'))


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('/client'))


app.post('/signUp', routes.signUp)
app.post('/login', routes.login)
app.post('/invite', routes.invite)
app.post('/receiveText', routes.receiveText)
app.post('/sendText', routes.sendText)
app.post('/getWaitlist', routes.getWaitlist)
app.post('/getBarbers', routes.getBarbers)
app.post('/deleteBarber', routes.deleteBarber)
app.post('/changeBilling', routes.changeBilling)
app.post('/cancelMembership', routes. cancelMembership)
app.get('/:code', function (req, res) {
    res.sendFile(__dirname + '/client/completesignup.html')
})
app.get('/changeBilling/:code', function (req, res) {
    res.sendFile(__dirname + '/client/changebilling.html')
})
app.post('/completeBarbershopSignup', routes.completeBarbershopSignup)





app.listen(process.env.PORT || 3000)