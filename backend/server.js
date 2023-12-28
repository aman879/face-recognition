const express = require("express");
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '172.26.12.172',
      port : 5432,
      user : 'postgres',
      password : 'shaurya@123',
      database : 'facerecognition'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@example.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@example.com',
            password: 'banana',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '871',
            hash: '',
            email: 'john@example.com'
        }
    ]
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    db.select('email','hash').from('login')
        .where('email','=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
             if(isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
             } else {
                 res.status(400).json('wrong password');
             }
        })
        .catch(err =>  res.status(400).json('wrong'))
})

app.post("/register", (req, res) => {
    const {email, name, password} = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(logInEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: logInEmail[0].email,
                    name: name,
                    joined: new Date()
                }).then(
                    user => {
                        res.json(user[0]);
                    }
                )
            }
        )
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to join'));    
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    return db.select('*').from('users').where({
        id: id
    }).then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('Not Found');
        }
    })
    .catch(err => res.status(400).json(err));
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    return db('users').where('id', '=', id)
    .increment('entires', 1)
    .returning('entires')       
    .then(entries => {
        res.json(entries[0].entires);
    })
    .catch(err => res.status(400).json('unable to get entries'));
})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running');
})

/*

/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user(count)

*/