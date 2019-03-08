const express = require('express')
const mysql = require('mysql')
//
const jwt = require('jsonwebtoken')
const router = express.Router()
// const config = require('./config')
const tokenList = {}
//
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.post('/user_create', (req, res) => {
    console.log("trying to create a new user...")
    console.log("how to get the form data")

    console.log("name:" + req.body.course_name)
    console.log("link:" + req.body.course_link)
    const name = req.body.course_name
    const link = req.body.course_link

    const queryString = "INSERT INTO course (name, link) VALUES (?, ?)"
    getConnection().query(queryString, [name, link], (err, results, fields) => {
        if(err){
            console.log("failed to insert new user:" +err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertedId);
        res.end()
    })
})

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'COURSES'
    })
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');

    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');

    res.setHeader('Access-control-Allow-Headers', 'X-Requested-with,content-type');

    res.setHeader('Access-control-Allow-Credentials',true);

    next();
});

app.get('/user/:name', (req, res) => {
    console.log("fetching user with name:" + req.params.name)


const connection = getConnection()

const username = req.params.name
const queryString = "SELECT * FROM course WHERE name =?"
connection.query(queryString, [username], (err, rows, fields) => {
    if(err){
        console.log("Failed:" + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("success")
    res.json(rows)
    })

})

app.get("/",(req, res) => {
    console.log("responding to root route")
    res.send("Hello from root!!!")
})

//get all details
app.get('/course', (req, res) => {
    console.log("fetching user with name:" + req.params.name)


const connection = getConnection()

const username = req.params.name
const queryString = "SELECT * FROM course"
connection.query(queryString, [username], (err, rows, fields) => {
    if(err){
        console.log("Failed:" + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("success")
    res.json(rows)
    })

})

//delete
app.delete('/course/delete/:name', (req, res) => {
    console.log("deleting the course with name:" + req.params.name)


const connection = getConnection()

const username = req.params.name
const queryString = "DELETE FROM course WHERE name=?"
connection.query(queryString, [username], (err, rows, fields) => {
    if(err){
        console.log("Failed:" + err)
        res.sendStatus(500)
        res.end()
        hjbekjbfv
        its
        itsa
        return
    }
    console.log("success")
    res.json(rows)
    })

})

//insert
app.post('/course/insert', (req, res) => {
    console.log("inserting the details:" + req.body.name)


const connection = getConnection()

// const username = req.body.name
// const userlink = req.body.link
// const course_duration = req.params.course_duration
// const price = req.params.price
const queryString = 'INSERT INTO course(name, link, course_duration, prices) VALUE(?, ?, ?, ?)'
connection.query(queryString, [req.body.name, req.body.link, req.body.course_duration, req.body.prices], (err, rows, fields) => {
    if(err){
        console.log("Failed:" + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("success")
    res.json(rows)
    })

})

//update
app.put('/course/update', (req, res)=> {

  const connection = getConnection()

  var pd = {
  name: req.body.name,
      duration:req.body.course_duration,
      price:req.body.prices,
      link: req.body.link
}

  console.log(req.body)
connection.query("UPDATE course c set c.course_duration = ?, c.prices = ?, c.link = ? WHERE name = ?", [pd.duration, pd.price, pd.link, pd.name], (err, rows, fields)=> {
  if (err) {
    res.send(rows);
    console.log("Failed:" + err);
  } else {
    res.send(rows);
    console.log("Update successfull");
  }
  });

});
//

router.get('/', (req,res) => {
  res.send('Ok');
})



//signin
app.post('/signin', (req, res) => {
  console.log(req.body)

  let det = {
    email: req.body.email,
    password: req.body.password
  }

const connection = getConnection()

const queryString = 'SELECT * FROM user WHERE email = ?'
connection.query(queryString, [det.email], (err, re, fields) => {
if(err) {
  console.log("Failed:" + err)
      res.sendStatus(500)

}else{
  if(re.length > 0){
    if(re[0].password == [det.password]){
      res.send({'status': 200});
     // res.send({ message:'login success',re});
    }
    else{
      res.send({
        message: "Doesn't match"
      });
    }
  }
  else {
      console.log(err)
      res.send({ message: 'It Doesnt match'})

        }
  }
})
})

//sign up
app.post('/signup', (req, res) => {
  // console.log("inserting the details:" + req.body.name)


 const connection = getConnection()

 const queryString = 'INSERT INTO user(name, email, password, age) VALUE(?, ?, ?, ?)'
 connection.query(queryString, [req.body.name, req.body.email, req.body.password, req.body.age], (err, rows, fields) => {
   if(err){
       console.log("Failed:" + err)
       res.sendStatus(500)
       res.end()
       return
   }
   console.log("success")
   res.json(rows)
   })

 })

app.listen(3004, () => {
    console.log("server is up and listening on 3004...")
})
