const express = require('express')
const app = express
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require ('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Recipe Book'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)  
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response) => {
    db.collection('recipes').find().toArray()
    .then(data => {
        response.render('index.ejs',{ info: data })
    })
    .catch(error => console.error(error))
})