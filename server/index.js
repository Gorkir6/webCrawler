const express = require('express')
const cors = require('cors')
const {main} = require('./main')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

 app.post('/',async (req, res)=>{
    try{
        const url =  req.body.url
        console.log(`se conecto, dio ${url}`)
        const result = await main(url)
        res.send(result)
    }catch(err){

    }

})

app.listen(process.env.PORT, ()=>{
    console.log(`Server conectado al puerto: ${process.env.PORT}`)
})