const express = require('express');
const speakeasy = require('speakeasy')
const uuid = require('uuid')
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const db = new JsonDB(new Config("myDataBase", true, false, '/'));
const app = express();

app.use(express.json())
app.get('/api', (req, res) => {
    res.json({
        message: "two factor authentication"
    })
})

// register user and create temp secret
app.post('/api/register', (req, res) => {
    const id = uuid.v4()

    try {
        const path = `/user/${id}`
        const temp_secret = speakeasy.generateSecret()
        db.push(path, { id, temp_secret })
        res.json({ id, secret: temp_secret })
    } catch (error) {
        res.status(500).json({
            message: "Error generating the secret"
        })
    }
})


// verify token and make secret
app.post('/api/verify', (req, res) => {
    const { token, userId } = req.body
    try {
        const path = `/user/${userId}`
        const user = db.getData(path)
        const { base32: secret } = user.temp_secret
        const verify = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 1
        })
        if (verify) {
            res.json({ verify: true })
        }
        res.json({ verify: false })
    } catch (error) {
        res.status(500).json({
            message: "Error generating the secret"
        })
    }

})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("port is running on " + PORT)
})