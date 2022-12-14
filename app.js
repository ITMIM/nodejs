const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const port = 5000
const router = express.Router()
const checkJwt = require('./auth');
const cors = require('cors');

const data={
    first_name: "Elturan",
    last_name: "Shucai",
    age: "20",
    birthDay: "01.03.2002",
    skills: [
        {
            skilName: "HTML",
            level: "5"
        },
        {
            skilName: "CSS",
            level: "5"
        },
        {
            skilName: "JavaScript",
            level: "5"
        },
        {
            skilName: "React",
            level: "4"
        },
        {
            skilName: "Redux toolkit",
            level: "4"
        },
        {
            skilName: "Tailwind CSS",
            level: "4"
        },
        {
            skilName: "GIT",
            level: "3"
        }
    ],
    email: "elturanfcb@gmail.com",
    github: "github.com/elturanshucai"
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

router.post('/login', function (req, res, next) {
    const email = req.body
    const token = jwt.sign({
        email: email,
        ad: 'Elturan',
        exp: Math.floor(Date.now() / 1000) + 600,
        issuer: 'www.iss.com'
    }, 'elturans')
    res.send(token)
})

router.post('/login2', (req, res) => {
    const token = jwt.sign(req.body, 'elturans', { expiresIn: '1h' });
    res.send(token);
});

router.post('/verify', (req, res) => {
    try {
        console.log(req.body);
        const { token } = req.body;
        console.log(token);
        const decodedData = jwt.verify(token, 'elturans');
        res.send(decodedData);
    } catch (err) {
        res.send(false);
    }
})

router.get('/test', function (req, res) {
    res.send('Hello World')
})
router.get('/', function (req, res, next) {
    res.send('Running')
})
router.get('/user',checkJwt, function (req, res, next) {
    res.send(data)
})

app.use('/', router)
app.listen(port, function () {
    console.log(`localhost: ${port} is running`)
})