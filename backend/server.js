require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());


//Mongodb Connection
global.ObjectId = mongoose.Types.ObjectId;
mongoose.connect(process.env.DB_HOST,{useNewUrlParser:true,useUnifiedTopology:true,autoIndex: false },(err)=>{
    if(err){
        console.log('Error',err);
    }
    console.log('Connected to Database');
});
mongoose.Promise = global.Promise;



// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to MentorApp application. Take notes quickly. Organize and keep track of all your notes."});
// });
app.use('/mentor',require('./routes/mentorRoutes') )
 //console.log(process.env);
 

app.listen(port, () => console.log('Connected'));

