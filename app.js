const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

require("dotenv").config();

const router = require('./Routes/route');

app.use(cors({
    origin: '*',
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`connected on ${port}`);
});