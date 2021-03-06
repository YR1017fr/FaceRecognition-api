const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

NODE_TLS_REJECT_UNAUTHORIZED = '0'
const db = knex({
    client:'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req, res) =>res.json('work'))

app.post('/signin',(req, res) =>signin.handleSignin(req, res, db, bcrypt))

app.post('/register',(req, res) =>register.handleRegister(req, res, db, bcrypt))

app.put('/image',(req, res) =>image.handleImage(req, res, db))

app.post('/imageurl',(req, res) =>image.handleApiCall(req, res))


const port = process.env.PORT || 3001;
const host = '0.0.0.0';;
app.listen(port,host, () => {
    console.log(`App is running on port ${ port }`);
});