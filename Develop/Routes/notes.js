// const path = require("path");
const app = require("express").Router()
const {readFromFile, readAndAppend,writeToFile} = require("../helpers/util")
const db = require("../db/db.json")
const fs= require("fs")
const uuid = require ("../helpers/uuid")
// const app = express()



    app.get("/",(req,res)=>{
        fs.readFile("./db/db.json", "utf-8",(err,data)=>{
            if(err){
                throw err
            }else{
                res.json(JSON.parse(data))
                
            }
        })
        
    });

//    Another get route for an specific note
app.get('/:id', (req, res)=>{
    for (let i = 0; i < db.length; i++) {
        if(db[i].id == req.params.id){
            return res.json(db[i])

        }
    }
    res.status(404).send("No notes found!")
})
//   post route for new note 
app.post('/:id', (req, res)=>{
    const {title, text} = req.body;
    if( req.body){
        const newNote ={
            title,
            text ,
            id: uuid()
        }
        readAndAppend(newNote, './db/db.json')
        res.json(`Nice! you have a new note added!`)
    } else{
        res.error('Not able to add note')
    }
})
//   Delete route 
app.delete('/:id', (req, res)=>{
    let id= req.params.id;
    const filtered =db.filter(note => note.id !== id)
    writeToFile('./db/db.json', filtered)
    readFromFile('./db/db.json')
    .then(data => res.json(JSON.parse(data)))
})
module.exports = app 