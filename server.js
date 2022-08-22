// CommonJS import
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')


const app = express()
dotenv.config()

//set the view engine to ejs
app.set('view engine', 'ejs')

// tell Express where the view folder will live
app.set('views', path.join(__dirname, '/src/templates/views') )

app.use(express.json())


//custom token login required middleware
const loginRequired = function(req, res, next){
    console.log('My Middleware is running')
    if (!req.headers.authorization){
        return res.sendStatus(401)
    } 
    token = req.headers.authorization.slice(7)
    user = people.filter(p=>p.token ==token)
    if (user.length <= 0){
        return res.sendStatus(401)
    }
    next()
}

// Build out the following routes, each route can be very basic and just render its corresponding template from the next step:

// - Home !
// - Profile !
// - Login !
// - Register
// - User
app.use(['/profile', '/user'],loginRequired)

app.get("/", (req, res)=>{
    res.render('index')
})

app.get("/user/:id", (req, res)=>{
                    // name in EJS : name in my JS
    res.render('user', {id:id})
})

app.get("/profile", (req, res)=>{
    res.render('profile')
})

app.get("/login", (req, res)=>{
    res.render('login')
})
app.get("/register", (req, res)=>{
    res.render('register')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT} ...`)
})

