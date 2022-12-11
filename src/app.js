const { query } = require('express');
const express = require('express');
const qs = require('qs');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const app = express();
app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const num = Number(req.query.length);
  if (num) {
    res.status(200).json({ result: firstCharacters(req.params.string, num) });
  } else {
    res.status(200).json({ result: firstCharacter(req.params.string) });
  }
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: add(a, b) });
  }
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: subtract(b, a) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  // if (typeof multiply(a, b) !== 'number') {
  //   // if (Boolean(a.match(/^[A-Za-z]/)) === true || Boolean(b.match(/^[A-Za-z]/)) === true) {
  //   res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  // }
  else {
    res.status(200).json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;
  if (a === 0) {
    res.status(200).json({ result: 0 });
  }
  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else {
    res.status(200).json({ result: divide(a, b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (a === 0) {
    res.status(200).json({ result: 0 });
  }
  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    res.status(200).json({ result: remainder(a, b) });
  }
});

module.exports = app;
