require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes.js')

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT;
 

app.use('/api/v1', clientRoutes)

async function connect() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`connected to port : ${PORT}`);
  });
}

connect();
