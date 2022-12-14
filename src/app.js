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
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  removeNthElement2,
  elementsStartingWithAVowel,
} = require('./lib/arrays');

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
  if (Number.isNaN(parseInt(a, 0)) || Number.isNaN(parseInt(b, 0))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;
  if (a === 0) {
    res.status(200).json({ result: 0 });
  }
  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(parseInt(a, 0)) || Number.isNaN(parseInt(b, 0))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
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
  }
  if (Number.isNaN(parseInt(a, 0)) || Number.isNaN(parseInt(b, 0))) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: remainder(a, b) });
  }
});

app.post('/booleans/negate', (req, res) => {
  res.status(200).json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  const a = req.body.value;
  if (a === '' || a === 0 || a === null) {
    res.status(200).json({ result: truthiness(a) });
  } else {
    res.status(200).json({ result: truthiness(a) });
  }
});

app.get('/booleans/is-odd/:a', (req, res) => {
  const { a } = req.params;
  if (a.match(/[A-Za-z]/)) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    res.status(200).json({ result: isOdd(a) });
  }
});

app.get('/booleans/:a/starts-with/:b', (req, res) => {
  const { a, b } = req.params;
  if (b.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    res.status(200).json({ result: startsWith(b, a) });
  }
});

app.post('/arrays/element-at-index/:a', (req, res) => {
  const { a } = req.params;
  res.status(200).json({ result: getNthElement(a, req.body.array) });
});

app.post('/arrays/to-string', (req, res) => {
  res.status(200).json({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  res.status(200).json({ result: addToArray2(req.body.value, req.body.array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.status(200).json({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element', (req, res) => {
  if (req.query.index) {
    res
      .status(200)
      .json({ result: removeNthElement2(parseInt(req.query.index, 0), req.body.array) });
  } else {
    res.status(200).json({ result: removeNthElement2(0, req.body.array) });
  }
});

module.exports = app;
