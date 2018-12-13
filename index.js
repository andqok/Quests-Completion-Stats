'use strict'

const express = require('express')
const path = require('path')

var app = express()

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname + '/data/MainPageInfo.json'))
})

app.listen(3000)