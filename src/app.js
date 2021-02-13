/*
Keyrt með:
node 05.urlencoded-middleware.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form með texta og skrá sem sent er með multipart/form-data á /post
App notar express urlencoded middleware til að vinna úr gögnum í stað straums.
Birtir innslegin gögn ásamt heiti á skrá.
*/

import express from 'express';

import { query } from './db.js'

import { body, validationResult } from 'express-validator';


const {
  PORT: port = 3000
} = process.env;


const app = express();

// Kemur í veg fyrir .on() dótið sem við gerðum í fyrri dæmum


app.get('/', async (req, res,) => {
  const result = await query('SELECT * FROM people;');
  console.log('result :>> ', result);

  const rows = result.rows;


  const names = '';
  const nationalId = '';
  const nationalIdPattern = '^[0-9]{6}-?[0-9]{4}$';
  const comment = '';

  res.send(`
  Nafnalisti:
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
  `) ;
});


app.use(express.urlencoded({ extended: true }));

//missing error catching!
app.post('/post', async (req, res) => {
  const name = req.body.name;
  console.log('name :>>', name);

  const nationalId = req.body.nationalId;
  console.log('nationalId :>>', nationalId);

  const comment = req.body.comment;
  console.log('comment:>>', comment);



  const result = await query('INSERT INTO people (name,nationalId,comment) VALUES ($1, $2, $3)', [name,nationalId,comment]);

  res.redirect('/');
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
