'use strict';

// --- Packages ---

const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
const cors = require('cors');

// --- Global Vars ---

const PORT = process.env.PORT;
const app = express();

// --- Express Configs ---

app.use(cors());

// --- Routes ---

app.get('/test', (req, res) => {res.send('Server is accessible. Welcome!')});

// --- Route Handlers ---

// --- Functions ---

// --- Server Start ---

app.listen(PORT, () => console.log(`server running on PORT ${PORT}: listening...`));
