'use strict'

const express = require('express')
const path = require('path')
const fs = require('fs')

var app = express()

var imgPath = path.join(__dirname, '/img')
app.use('/img', express.static(imgPath) )

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname + '/data/MainPageInfo.json'))
})

app.get('/games/:game', function (req, res) {
    const game = req.params.game
    
    fs.readFile( __dirname + '/data/GeneralQuestsInfo.json', 'utf8', (err, data) => {
        const generalInfo = JSON.parse( data )
        const relevant = generalInfo.filter(obj => {
            return obj.alias === game
        })
        res.end(JSON.stringify(relevant))
    })  
})

app.listen(3000, () => {
    console.log('listening on 3000')
})