const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)

const memberRouter = require('./routes/members.js');

app.use('/', memberRouter)

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}...`)
})