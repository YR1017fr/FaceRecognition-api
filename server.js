const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register= require('./controllers/register');
const signin = require('./controllers/signin');
const profile= require('./controllers/profile');
const image=require('./controllers/image');

var reqTimer = setTimeout(function wakeUp() {
  request("https://nameless-gorge-19527.herokuapp.com", function() {
     console.log("WAKE UP DYNO");
  });
  return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db=knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  return db.select('*').from('users')                      
    .then(user=>{
      res.json(user[0])
    })
    .catch(err=>res.status(400).json('unable to get uesr'))
})

app.post('/signin',(req,res)=>signin.handleSignin(req,res,db,bcrypt))

app.post('/register',(req,res)=>register.handleRegister(req,res,db,bcrypt))

app.get('/profile/:id',(req,res)=>profile.handleProfile(req,res,db))

app.put('/image',(req,res)=>image.handleImage(req,res,db))


app.post('/imageurl',(req,res)=>image.handleApiCall(req,res))


const port = process.env.PORT || 3000;
const host = '0.0.0.0';;
app.listen(port,host, () => {
    console.log(`App is running on port ${ port }`);
});