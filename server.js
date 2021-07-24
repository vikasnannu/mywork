//jshint esversion: 6

const express = require("express");
const request = require("request");
const https = require("https");
const response  = require("express");
const port = 3000;
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({
    extended:true
}));

app.get(("/"), (req,res) => {
    res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req,res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members:[{
        email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME : firstName,
            LNAME : lastName  }
          }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/4e1d1ec07f";

    const options = {
        method: "POST",
        auth: "Vikas1:5d876723656e04354411c8b2579c70b4-us6",
    }

    const request = https.request(url, options, (response) => {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", (req,res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || port, ()=> {
    console.log("Server is running on port: ", port);
});

//API Key
//5d876723656e04354411c8b2579c70b4-us6

//List ID
//4e1d1ec07f

