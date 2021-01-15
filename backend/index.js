const express = require('express')
const app = express()
const path = require('path')

const getExRates = require('./getExRates')

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())

getExRates()

app.use('/latest',express.static('latest.json'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static((path.join(path.dirname(__dirname), '/build'))))
    app.get('*', (req, res) =>{
        res.sendFile (path.join(path.dirname(__dirname), '/build/index.html'))
    })
}


app.listen(PORT, () => console.log('[OK] Server en puerto' + PORT))
