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
  res.send(`
  Nafnalisti: ${names}
<form method="post" action="/post" enctype="application/x-www-form-urlencoded">
  <input type="text" name="name">
  <input type="text" name="sirname">
  <button>Senda</button>
</form>
  `) ;
});

app.use(express.urlencoded({ extended: true }));

//missing error catching! 
app.post('/post', async (req, res) => {
  const name = req.body.name;
  console.log('name :>>', name);
 
  const result = await query('INSERT INTO people (name) VALUES ($1)', [name]);

  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
