const express = require("express");
const path = require ("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const fs = require("fs");
const render = require ("render")
const port = 80;

mongoose.connect('mongodb://localhost/contactDance', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
//define moangooes schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  var contact = mongoose.model('Contact', contactSchema);
  

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//for the template engine pug
app.set('views',path.join(__dirname,'views'))// Set the view directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug' ,params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug' ,params);
})
app.get('/Services', (req, res)=>{
    const params = { }
    res.status(200).render('services.pug' ,params);
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item is not saved to the database")
    });
    //res.status(200).render('contact.pug');
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application is started succesfully on port  ${port}`);
});
 
