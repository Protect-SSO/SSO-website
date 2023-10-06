const axios = require('axios')
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
})


const host = process.env.AUTH_HOST

async function LoginReq(username,password) {
    let authResponse = await axios.post(host + "Login",
    {
        UserName:username,
        Password:password
    }).then(function(response) {
        return response.data
    }).catch(function(error){
        return error
    }); 
    return authResponse
}

module.exports = {LoginReq}