const Query = require('../../query/query')
const crypto = require('crypto')


const createHash = (password) => {
    const randomBit = crypto.randomBytes(1).toString('hex')
    const passwordHash = crypto.createHash('md5').update(randomBit + password).digest('hex') + ':' + randomBit
    return passwordHash
}

const matchPassWordHash = (passWord, passWorInDb) => {

}

const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const hashPassWord = createHash(password)
        const sqlQuery = `insert into users (name,password,email) values ("${name}","${hashPassWord}","${email}")`
        const signUpUser = await Query.post(sqlQuery)
        res.status(200).send({
            isRegister: true,
            message: "register user successfully"
        })
    } catch (error) {
        res.status(400).send({
            isRegister: false,
            isError: true,
            message: "cannot registered the user"
        })
    }
}

const signIn = (req, res) => {
    const { email, password } = req.body
}


const signIntWithTwoFactor = (req, res) => {

}


const forgetPassword = (req, res) => {

}


const resetPassword = (req, res) => {

}

module.exports = {
    signUp
}