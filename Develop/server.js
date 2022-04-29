
const express = require("express");
// const { dirname } = require("path");
const PORT = process.env.PORT || 3000;
const app = express()
// const path= require("path")



app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.use(express.static("public"));
const notesRouter = require("./Routes/notes")
app.use("/api/notes",notesRouter)

app.get('/notes',(req, res)=>{  
    res.sendFile(__dirname + "/public/notes.html")
}); 

app.get('*',(req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
});


// begin listening
app.listen(PORT,function(){
    console.log("App listening on http://localhost:" + PORT);
});