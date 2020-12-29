// this is the main entry point for your full app
// it serves your frontend & provides access to your API

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const School = require('./models/School');

const api = require('./api/server');
const { countDocuments } = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect Mongo DB
mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false}, ()=> console.log('connected to database'));
mongoose.Promise = global.Promise;


app.use((req, res, next) => {
  console.log(req.method + ': ' + req.path);
  next();
});



app.use('/', express.static(__dirname + '/client/build/'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.use('/api', api);


const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
