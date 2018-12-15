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
    res.sendFile(
        path.join(
            dataJson`MainPageInfo`
        )
    )
})

app.get('/games/:game/id/:id', function (req, res) {
    const game = req.params.game
    const id = +req.params.id

    fs.readFile( dataJson`GeneralQuestsInfo`, 'utf8', (err, data) => {
        const generalInfo = JSON.parse( data )

        fs.readFile( dataJson`FinishedQuestsLeafs`, 'utf8', (err, data) => {
            const relevantGame = generalInfo.filter(obj => {
                return obj.alias === game && obj.globalId === id
            })[0]

            if (relevantGame) {
                const allLeafs = JSON.parse(data)
                const relevantLeafs = allLeafs.filter(leaf => {
                    return leaf.questId === relevantGame.id
                }).map(leaf => leaf.name)
    
                relevantGame.pathway.leafs = relevantGame.pathway.leafs.map(leaf => {
                    let passed = relevantLeafs.includes(leaf) ? true : false
                    return {
                        leaf,
                        passed
                    }
                })
                res.end(JSON.stringify(relevantGame))
            } else {
                res.end('')
            }
        })
    })  
})

app.listen(3000, () => {
    console.log('listening on 3000')
})

function dataJson(name) {
    return __dirname + '/data/' + name + '.json'
}