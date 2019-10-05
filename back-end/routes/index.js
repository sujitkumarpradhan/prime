var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var aws = require("aws-sdk");
const creds = require("../config/config");

// configure aws sdk
aws.config.update({
    accessKeyId: creds.ACCESS_KEY,
    secretAccessKey: creds.SECRET,
    region: "us-east-1"
});

// var sesNew = new aws.SES({ apiVersion: "latest", correctClockSkew: true });

// create nodemailer transport
var transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: "latest",
        correctClockSkew: true
    })
});

//Post request with send data
router.post("/send", (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var emailString = req.body.to;
    var content = `${message}`;
    var to = emailString.split(",");
    for (var i = 0; i < to.length; i++) {
        to[i] = to[i] + "@amazon.com";
    }
    transporter.sendMail(
        {
            from: "presentation-tool@amazon.com",
            to: to,
            subject: "Feedback from tentpole review 2018",
            text: content,
            html: content
            // attachments: [
            //     {
            //         path: "./images/test.jpg"
            //     }
            // ]
        },
        (err, info) => {
            if (err) {
                console.log("error occured", err);
                res.json({
                    msg: "fail"
                });
            } else {
                console.log(info.envelope);
                console.log(info.messageId);
                res.json({
                    msg: "success"
                });
            }
        }
    );
});

module.exports = router;
