//file is basically setting up the strucutre of how we want data to show 
// in mongodb atlas--> in this case we making a table with specific headers
const mongoose = require('mongoose')

const UsersSchema=new mongoose.Schema(
    //below fields are headers of columns
    {
        //can add other properties besides String
        name: String,
        email: String,
        password: String
    }
)

//first parameter of 'Users' displays the name of the database, second parameter
//is what we want the database to have (a table with specific headings according
//to above)
const UsersModel=mongoose.model("Users", UsersSchema)
//exporting model so we can import into server (index.js in backend)
module.exports=UsersModel