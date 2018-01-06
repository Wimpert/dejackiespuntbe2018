const restify = require('restify');
const nodemailer = require('nodemailer');




function respondHello(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}


function handleTest(req, res, next) {
    //res.send(process.env);
    next();
}

function handleMail(req, res, next){
    console.log(req.body.firstName);
    if(req.headers.host != "localhost:8080") {
        nodemailer.createTestAccount((err, account) => {

            // create reusable transporter object using the default SMTP transport
            /*let transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                debug: true,
                auth: {
                user: "de_jackies@hotmail.com", // generated ethereal user
                    pass: "spelvreugde666"  // generated ethereal password
            }
        });*/

        var transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: "de_jackies@hotmail.com", // sender address
            to: req.body.email, // list of receivers
            bcc: 'holvoetwim@hotmail.com,  dimitriverthe@hotmail.com',
            subject: 'Uw inschrijving voor de Jackies Cup 2018 ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: `<b>${JSON.stringify(req.body)}</b>` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("oeps");
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
// Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    };
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    res.send('hello from mailer');
    next();
}

var server = restify.createServer();

server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
});

server.use(
    restify.plugins.bodyParser()
);

server.get('/hello/:name', respondHello);
server.head('/hello/:name', respondHello);


server.post('/mail', handleMail);
server.get('/test', handleTest)

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});