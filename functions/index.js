const functions = require('firebase-functions');
const express = require('express');
const app = express();

// app.use(require('prerender-node').set('prerenderToken', 'D3evfbPu1t6TkowL6WNh'));

app.get("*", (req, res) => {
  res.status(200).send()
})

exports.prerender = functions.https.onRequest(app);