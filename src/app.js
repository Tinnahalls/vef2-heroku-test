/*
Keyrt með:
node 05.urlencoded-middleware.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form með texta og skrá sem sent er með multipart/form-data á /post
App notar express urlencoded middleware til að vinna úr gögnum í stað straums.
Birtir innslegin gögn ásamt heiti á skrá.
*/

import express from 'express';
import { query } from './db.js';

import { body, validationResult } from 'express-validator';

const app = express();

app.use(express.urlencoded({ extended: true }));

//express EJS
//app.locals.importantize = str => `${str}!`;

//const viewsPath = new URL('./views');

//app.set('view engine', 'ejs');
//app.set('views', viewsPath);

//app.get('/', (req, res) => {
  // `title` verður aðgengilegt sem breyta í template
  //res.render('index', { title: 'Forsíða' });
//});


// Kemur í veg fyrir .on() dótið sem við gerðum í fyrri dæmum


app.get('/', async (req, res,) => {
  const result = await query('SELECT * FROM people;');
  console.log('result :>> ', result);

//Cannot read property 'rows' of undefined


  const names = '';
  const nationalId = '';
  const nationalIdPattern = '^[0-9]{6}-?[0-9]{4}$';
  const comment = '';

  res.send(`
  <body>

  <h1> Nafnalisti: </h1>
  <div class="column">
    <div class="row">
      <form method="post" action="/post">
      <label>
      Nafn:
     <input required type="text" name="name" value="${names}">
       </label>
      <label>
       Kennitala:
       <input
        required
       type="text"
       pattern="${nationalIdPattern}"
       name="nationalId"
       value="${nationalId}">
    </label>
    <label>
    Athugasmend:
    <input required type="text" name="comment" value="${comment}">
    </label>
    <button>Senda</button>
    </form>
  </div
 </div>
 </body>
  `) ;
});



//missing error catching!
app.post('/post', async (req, res) => {
  const name = req.body.name;
  console.log('name :>>', name);

  const nationalId = req.body.nationalid;
  console.log('nationalId :>>', nationalId);

  const comment = req.body.comment;
  console.log('comment:>>', comment);


  const result = await query('INSERT INTO people(name,nationalid) VALUES ($1,$2)', [name,nationalId]);


  res.redirect('/');
});




const {
  PORT: port = 3000
} = process.env;


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
