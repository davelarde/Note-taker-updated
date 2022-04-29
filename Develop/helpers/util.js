const fs = require("fs")
const util = require("util")

const readFromFile = util.promisify(fs.readFile);

const writeToFile =(destination, content)=>
fs.writeFile(destination, JSON.stringify(content, null, 4))

const readAndAppend= (content, file)=>{
    fs.readFile(file,"utf-8", (err, data)=>{
        if(err){
            throw err
        }else{
            const parseData = JSON.parse(data)
            parseData.push(content)
            writeToFile(file, parseData)
        }
    });
};
