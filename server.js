'use strict';

// --- Packages ---

const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { response } = require('express');

// --- Global Vars ---

const PORT = process.env.PORT;
const app = express();
const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_URL = process.env.IBM_URL;

// --- Express Configs ---

app.use(cors());

// --- Routes ---

app.get('/test', (req, res) => {res.send('Server is accessible. Welcome!')});
app.get('/txtspeech', convertText);

// --- Route Handlers ---

function convertText(req, res) {
  // IBM Text to Speech API docs
  // https://cloud.ibm.com/apidocs/text-to-speech?code=node

  // const inputText = 'Trust me. There\'s no way that we\'re getting out of this without some errors.';
  const inputText = req.query.text;

  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: IBM_API_KEY,
    }),
    url: IBM_URL
  });

  const synthesizeParams = {
    text: inputText,
    accept: 'audio/wav',
    voice: 'en-US_EmilyV3Voice',
  };
  
  textToSpeech.synthesize(synthesizeParams)
    .then( ibmResponse => {
      return textToSpeech.repairWavHeaderStream(ibmResponse.result);
    })
    .then(buffer => {
      fs.writeFileSync('sample.wav', buffer);
    })
    .catch(err => {
      console.log('error:', err);
    });

  res.send('txtspeech route ok');
}

// --- Functions ---

// --- Server Start ---

app.listen(PORT, () => console.log(`server running on PORT ${PORT}: listening...`));
