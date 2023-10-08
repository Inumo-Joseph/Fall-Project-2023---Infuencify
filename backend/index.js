const express=require("express")
const mongoose=require ('mongoose')
const cors=require('cors')
const UsersModel=require('./models/users')
const app=express()
//will transport data from front end to backend in json
app.use(express.json())
app.use(cors())

//creating connection to mongodb

mongoose.connect("mongodb+srv://adeb:PYouTakMen73@influencify-db.dyvzlr4.mongodb.net/?retryWrites=true&w=majority")


app.post("/login", (req,res)=>
{
    //email and password storing in req.body--> email and password coming in from
    // frontend
    const {email, password}=req.body;
    //below line will find the req based on email
    UsersModel.findOne({email: email})
    //if we find an email then we check if user existed. '.then(user)=>'
    // refers to the values in UsersModel
    .then(user=>{
        if(user)// if user existed
        {
            if(user.password===password)// if password is correct, matching password in db
            // with password that user inputs
            {
                res.json("Success")
            }
            else
            {
                res.json("The password is incorrect.")
            }
            
        }
        else {
            res.json("No record existed.")//user doesn't exist
        }
    })
})

app.post('/register', (req, res)=>
{
    //req.body holds data thats coming in from front end
    UsersModel.create(req.body)
    //below line is returning data into front end
    .then(users=> res.json(users))
    .catch(err=>res.json(err))
}
)

app.listen(3001,()=>{
    console.log("server is running")
})