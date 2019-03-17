const restify = require('restify');
const nodemailer = require('nodemailer');

const limits = {
    M:32,
    F:8
}

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

function respondHello(req, res, next) {

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log("results", results);
        res.send('hello ' + req.params.name);
        next();
      });

    
}


function insertParticipant(req, res, next){
    const backup = req.full ? 'Y' : 'N';
    connection.query('INSERT INTO `subscriptions`.`subscriptions`(`team_name`,`first_name`,`last_name`,`email`,`league`,`date`,`phone_number`,`backup`)VALUES(?,?,?,?,?,?,?,?);', [req.body.teamname,req.body.firstName,req.body.name,req.body.email,req.body.type, new Date(), req.body.phone,backup], function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        }
        if(results){
            //res.send('ok');
            next();
        }

      });
}

function countParicipants(req, res, next) {
    connection.query('select count(id) as number_of_supscriptions from `subscriptions`.`subscriptions` where league = ?', [req.body.type], function (error, results, fields) {
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        }
        if(results){
            req.full = results[0].number_of_supscriptions >= limits[req.body.type];
            next();
        }
    });
}


function sendMail(req, res, next){

    //if(req.headers.host != "localhost:8080") {
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

            var data = req.body;

            var htmlMail = `
                <p>Beste ${data.firstName},</p>
                <p>We hebben uw inschrijving via onze website goed ontvangen, alvast bedankt voor uw deelname! 
                Om zeker te zijn van een plaatsje op ons tornooi verzoeken wij u om ${data.type == "F" ? 70 : 100} euro (incl. 20 euro waarborg) over te schrijven op
                <strong>BE75 0688 9166 5251</strong>
                met vermelding van uw ploegnaam. Pas dan is uw inschrijving officieel.</p>
                <p>Verdere info over het tornooi volgt later (spelerslijst, speelschema, tornooireglement, ...) Hieronder nog eens de gegevens die wij van u ontvangen hebben:</p>
                <ul>
                <li>Voornaam: ${data.firstName}</li>
                <li>Naam: ${data.name}</li>
                <li>Email: ${data.email}</li>
                <li>GSM: ${data.phone}</li>
                <li>Ploeg: ${data.teamname}</li>
                <li>Tornooi: ${data.type == "F" ? "vrouwen" : "mannen"}</li>
                </ul>
                <p>${data.type == "F" ? "Het vrouwen tornooi zal enkel doorgaan indien wij voldoende inschrijvingen ontvangen." : ""}</p>
                <p>Met Vriendelijke Groeten,</p>
                <p>De Jackies</p>
            `;


            var htmlFullMail = `
                <p>Beste ${data.firstName},</p>
                <p>Helaas moeten wij u meedelen dat ons tornooi voorlopig volzet is. Wij zullen u op een wachtlijst plaatsen en wanneer er afzeggingen zijn, bellen wij u op.</p>
                <p>Hieronder nog eens de gegevens die wij van u ontvangen hebben:</p>
                <ul>
                <li>Voornaam: ${data.firstName}</li>
                <li>Naam: ${data.name}</li>
                <li>Email: ${data.email}</li>
                <li>GSM: ${data.phone}</li>
                <li>Ploeg: ${data.teamname}</li>
                <li>Tornooi: ${data.type == "F" ? "vrouwen" : "mannen"}</li>
                </ul>
                <p>${data.type == "F" ? "Het vrouwen tornooi zal enkel doorgaan indien wij voldoende inschrijvingen ontvangen." : ""}</p>
                <p>Met Vriendelijke Groeten,</p>
                <p>De Jackies</p>
            `;
                let mail = htmlMail;
              if(req.full){
                mail = htmlFullMail;
              }

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
            to: data.email, // list of receivers
            bcc: 'holvoetwim@hotmail.com, de_jackies@hotmail.com',
            subject: 'Uw inschrijving voor de Jackies Cup 2019 ✔', // Subject line// plain text body
            html: mail // html body
        };


        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("oeps", error);
                res.send(500);
            } else {
                res.send('mail send');
            }
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
   // };
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    
}


function getTeams(req, res, next){
    connection.query('select * from `subscriptions`.`subscriptions` where subscriptions.backup = ?',['N'], function (error, results, fields) {
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        }
        if(results){
            const mapped_data = results.reduce((acc, team) => {
                acc[team.league].push(team);
                return acc;
            }, {M:[],F:[]});
            res.json(mapped_data);
        }
    });

}

var server = restify.createServer();

server.use((req, res, next) => {
    return next();
});

server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
});

server.use(
    restify.plugins.bodyParser()
);

server.post('/hello/:name', respondHello);
server.head('/hello/:name', respondHello);


server.get('/teams', getTeams);
server.post('/subscribe', [countParicipants, insertParticipant, sendMail]);

server.get('/', restify.plugins.serveStatic({
    directory: './',
    default: 'index.html'
}));

server.get('/.*/', restify.plugins.serveStatic({
    directory: './',
    default: 'index.html'
}));

server.get('/tornooi', restify.plugins.serveStatic({
    directory: './tornooi/',
    default: 'index.html'
}));

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});