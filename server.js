var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var bodyParser=require('body-parser');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
var crypto=require('crypto');
var config={
    user:'charanreddyanumula',
    database:'charanreddyanumula',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    };
    
var pool=new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request
    //return a response with the results
  pool.query('select *from article',function(err,result){
      if(err)
        { res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
  });
});

/*var articles:{
    article-one:{
        title:'article-one--> charan',
        heading='Article One',
        date='2017-07-31',
        content:` here u r going to get my personal data
                        ND professional skils too`
    }
     article-two:{
        title:'article-two--> charan',
        heading='Article two',
        date='2017-08-01',
        content:` page2:here r the page2 details`}
}*/
function createtemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmltemplate=`<html>
    <head>
        <title>${title}</title>
        <meta name="viewport"  content="width=device-width,initial-screen=1" />
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
         
        <div class="container">
              <div>
                  <a href='/'>Home</a>
              </div>
              <h3>${heading}</h3>
              <div>
              ${date.toDateString()}
              <div>
                
                   ${content}
              </div>
        </div>
    </body>
    </html>
    `;
}
//submitting names using url
var names=[];
app.get('/submit-name',function(req,res){
    //charanreddyanumula.imad.hasura-app.io/submit-name?name=sharan
    var name=req.query.name;
    names.push(name);
    //json
    res.send(JSON.stringfy(names));
});

function hash(input,salt){
    //how to create a hash 
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res) {
    var hashedString=hash(req.params.input,'this is a salt random value');
    res.send(hashedString);
});

app.get('/create-user', function (req, res) {
    
     //username and password
     //{"username":"charan","password":"pass"}
    //JSON 
    var username=req.body.username;
    var password=req.body.password;

 var salt=crypto.randomBytes(128).toString('hex');
 var dbString=hash(password,salt);
 pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
      if(err)
        { res.status(400).send(err.toString());
        }else{
            res.send('user sussesfully created'+username);
        }
     
 });
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

//getting data of articles from data-base
app.get('/article/:articleName',function(req,res){
    pool.query("SELECT *FROM article WHERE title= '" + req.params.articleName + "'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send("article not found@@");
            }else{
               var articleData= result.rows[0]; 
                res.send(createtemplate(articleData));  
            }

        }
    });
 
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
    
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port= 80;
app.listen(port, function () {

console.log(`IMAD course app listening on port ${port}!`);
});
