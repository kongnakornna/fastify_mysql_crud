import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as knex from 'knex'
import * as crypto from 'crypto'
/************* nodemailer*******************/ 
import { AuthadminModel } from '../../../modules/auth/models/authadmin_model' 
/**************Models************************************/
import { UserModel } from '../../../modules/auth/models/user_model'
import { AuthModel } from '../../../modules/auth/models/auth_model'
/************* validate schemas*******************/
import bodySchema from '../../../modules/auth/schemas/body'
import bodysingupSchema from '../../../modules/auth/schemas/bodysingup'
import singinSchema  from '../../../modules/auth/schemas/singinSchema' 
import paramsSchema from '../../../modules/auth/schemas/params'
import queryStringSchema from '../../../modules/auth/schemas/query_string'
import headerSchema from '../../../modules/auth/schemas/header'
/************* validate schemas*******************/
import changepasswordSchema from '../../../modules/auth/schemas/changepasswordSchema' 
import changeemailSchema from '../../../modules/auth/schemas/changeemailSchema' 
import accesstokenSchema from '../schemas/accesstokenSchema' 
import * as path from 'path'
const envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE1 = env.TIMEEXPIRE
const TIMEEXPIRE = env.TIMEEXPIRE_TOKEN
const mode = env.mode
const client_id = env.client_id
const access_token_key = env.access_token_key
const secret_key = env.secret_key
const scopenumber = env.scopenumber

// console.log("mode: ", mode)
// env.DB1_HOST
// TypeScript
import * as EmailValidator from 'email-validator'
// function name auth
export default async function auth(fastify: FastifyInstance) {
const userModel = new UserModel()
const AuthModels = new AuthadminModel()
const db1: knex = fastify.db1
/**************************************************/  
function toTimestamp(strDate:any){
    var datum = Date.parse(strDate);
    return datum/1000;
}
function timeConverter(UNIX_timestamp:any){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
function passwordValidator(inputtxt: any){ 
        var paswd :any= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
        if(inputtxt.match(paswd)){  
            console.log('Your validate password  Correct, try another...:'+inputtxt);
            return true;
        }else{  
                console.log('You validate password Wrong...:'+inputtxt);
            return false;
        }
}  
function generatePassword(passwordLength: any) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var vaChars = "!@#$%^&*";
    var allChars = numberChars + upperChars + lowerChars+ vaChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}
function shuffleArray(array: any) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
}
// use  lang: getlanguage(1),  
function getlanguage(id: any) {
    const language: any =AuthModels.tr_language_all_id(db1,id)
    //var rs: any = {}
    let result: any = {}
        for (const [key, value] of Object.entries(language)) {
            const keys: any = key
            const rs: any = value
            const code: any = rs.code
            const lang_id: any = rs.language_id
            const name: any = rs.name
            const language_data: any = { code: code, language_id: lang_id, name: name }
            result=language_data 
            }
    return result
}
function getRandomString(length: any) {
        var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
}  
function setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;
        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}
function getCookie(name: string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            //return parts.pop().split(";").shift();
        }
}
function deleteCookie(name: string) {
        const date = new Date();
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}    
fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no
    reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    reply.header('Expires', '-1')
    reply.header('Pragma', 'no-cache') 
    // no-cache  private  public max-age=31536000 must-revalidate
    reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    reply.header('message', 'Working')
   
    /*****************************************************/
    if (ma==1) {
      reply.header('status', true) 
      reply.header('statusCode', 200) 
      reply.code(200).send({
              title: { status: true, statusCode: 200, mode:'service' },
              status: true,
              statusCode: 200,
              statusrun: 1,
              cache: 'no cache',
              nameservice: 'Micro service tppy-tcas',
              message: 'The system works in normal mode.',
              message_th: 'ระบบทำงาน ในโหมดปกติ',
            })
    } else {
      reply.header('status', false) 
      reply.header('statusCode', 500) 
      reply.code(500).send({
            title: { status: false, statusCode: 500, mode:'Maintenance mode' },
            status: false,
            statusCode: 500,
            statusrun: 0,
            cache: 'no cache',
            nameservice: 'Micro service tppy-tcas',
            message: 'Maintenance mode , Sorry for the inconvenience',
            message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
          })
    
   }
  /*****************************************************/
}) 
fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no
    reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    reply.header('Expires', '-1')
    reply.header('Pragma', 'no-cache') 
    // no-cache  private  public max-age=31536000 must-revalidate
    reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    reply.header('message', 'Working')
   
    /*****************************************************/
    if (ma==1) {
      reply.header('status', true) 
      reply.header('statusCode', 200) 
      /*************************/
      const expirein ="1days" // 60, "2 days", "10h", "7d" ("120" is equal to "120ms").
      const expire_in :any= expirein
      const token = fastify.jwt.sign({ name: 'demo' },{ expiresIn: expirein})
      const decoded = fastify.jwt.decode(token)
      const jwtdata: any = {}
      jwtdata.token = token
      jwtdata.decoded = decoded  
      jwtdata.expirein = expire_in
      /*************************/
      reply.code(200).send({
              title: { status: true, statusCode: 200, mode:'service' },
              status: true,
              statusCode: 200,
              statusrun: 1,
              cache: 'no cache',
              nameservice: 'Micro service tppy-tcas',
              message: 'The system works in normal mode.',
              message_th: 'ระบบทำงาน ในโหมดปกติ',
              jwtdata: jwtdata,
            })
    } else {
      reply.header('status', false) 
      reply.header('statusCode', 500) 
      reply.code(500).send({
            title: { status: false, statusCode: 500, mode:'Maintenance mode' },
            status: false,
            statusCode: 500,
            statusrun: 0,
            cache: 'no cache',
            nameservice: 'Micro service tppy-tcas',
            message: 'Maintenance mode , Sorry for the inconvenience',
            message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
          })
    
   }
  /*****************************************************/
}) 
fastify.post('/v1', async (request: FastifyRequest, reply: FastifyReply) => {
        /*******var**************/
        var ma : any =env.mode // 0= ma
        try {
            if (ma == 1) { } else {
                reply.header('status', false)
                reply.header('statusCode', 500) 
                reply.code(500).send({
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                    status: false,
                    statusCode: 500,
                    statusrun: 0,
                    cache: 'no cache',
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        /*******var**************/
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache') 
                reply.header('Pragma', 'no-cache') 
                // no-cache  private  public max-age=31536000 must-revalidate
                reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
                reply.header('message', 'Working')
                reply.header('statusCode', 200) 
                reply.header('status', true) 
                /*****************************************************/
                reply.code(200).send({title:{
                                            status: true,
                                            statusCode: 200,
                                            cache: 'no cache',
                                            message: 'Working admin',
                                            message_th: 'ทำงาน', 
                                        },  
                })
                /*****************************************************/
                console.log(request.body)
})
fastify.get('/v1', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500) 
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service tppy-tcas',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }
    } catch (error) { }
    
        /*******var**************/
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache') 
                // no-cache  private  public max-age=31536000 must-revalidate
                reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
                reply.header('message', 'Working')
                reply.header('statusCode', 200) 
                reply.header('status', true) 
                /*****************************************************/
                reply.code(200).send({title:{
                                            status: true,
                                            statusCode: 200,
                                            cache: 'no cache',
                                            message: 'Working admin',
                                            message_th: 'ทำงาน', 
                                        },  
                })
                /*****************************************************/
                console.log(request.body) 
})
/**************************************************/    
fastify.get('/authenticateuser', { preValidation: [fastify.genint] }, async (request: FastifyRequest, reply: FastifyReply) => { }) 
/**************************************************/ 
fastify.get('/genint',{preValidation: [fastify.genint]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/genint',{preValidation: [fastify.genint]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/getstate',{preValidation: [fastify.getstate]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/getstate',{preValidation: [fastify.getstate]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/clientsecret',{preValidation: [fastify.clientsecret]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/clientsecret',{preValidation: [fastify.clientsecret]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/codegenclientid',{preValidation: [fastify.codegen]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/codegenclientid',{preValidation: [fastify.codegen]}, async (request: FastifyRequest, reply: FastifyReply) => {})  
/**************************************************/
fastify.post('/singup', { schema: bodysingupSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
        const envPath = path.join(__dirname, '../.env') 
        require('dotenv').config({ path: envPath })
        const env = process.env 
        const opts = {}
        var TIMEEXPIRE : any = env.TIMEEXPIRE
        var TIMEEXPIRE_TOKEN : any =  env.TIMEEXPIRE_TOKEN
        var mode : any =  env.mode
        var client_id_conf: any =  env.client_id
        var access_token_key_conf : any =  env.access_token_key
        var secret_key_conf: any =  env.secret_key
        var scopenumber_conf: any =  env.scopenumber
        /*************************/
        const headers: any = request.headers // header
        const body: any = request.body // post 
        const query: any = request.query // ?xx=1
        const str: any = headers.authorization  
        var timeset : any = '7d' // 60, "2 days", "10h", "7d".
        var time : any = body.time
        // var expire_in : any = time || timeset
        var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
        // access token
        /*************************/
        const username = body.username
        const password = body.password
        const debug = body.debug
        const email = body.email
        if (username === "") { const username = body.email }
        const firstname = body.firstname
        const lastname = body.lastname
        const level = body.level
        const network_id = body.network_id
        const network_type_id = body.network_type_id
        if (network_type_id === "") { const network_type_id = 1 }
        try {
            if (username === "") {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({ title: { status: false, statusCode : 500,cache: 'no cache' },message: 'username is null',message_th: 'ไม่พบข้อมูล username' })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            } if (password === "") {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({ title: { status: false, statusCode : 500,cache: 'no cache' },message: 'password is null',message_th: 'ไม่พบข้อมูล password' })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            } 
            /* Password Validator */
            const passwordrt: any = passwordValidator(password)
            if (passwordrt == false) {
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache') // no-cache  private  public max-age=31536000 must-revalidate
                reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
                reply.header('message', 'Password not secure')
                reply.header('statusCode', 500) 
                reply.header('status', false)
                reply.header('Password', false)
                reply.code(500).send({
                    title: {
                        status: false,
                        statusCode: 500,
                        cache: 'no cache'
                    },
                    message: 'Password not secure ,Please set a new password, English only, with uppercase, lowercase, numbers and special characters.,mix together',
                    message_th: ' รหัสผ่าน ไม่ปลอดภัย กรุณาตั้งรหัสผ่านใหม่ เป็นภาษาอังกฤษเท่านั้น ตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ ผสมกัน'
                })
                console.log(' passwordrt :'+passwordrt)
                return
            }
            const encPassword = crypto.createHash('md5').update(password).digest('hex')
            if (email === "") {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({ title: { status: false, statusCode : 500,cache: 'no cache' },message: 'email is null',message_th: 'ไม่พบข้อมูล email' })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            } if (firstname === "") {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({ title: { status: false, statusCode : 500,cache: 'no cache' },message: 'firstname is null',message_th: 'ไม่พบข้อมูล firstname' })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            }if (lastname==="") {
                reply.code(500).send({ title: { status: false, statusCode : 500,cache: 'no cache' },message: 'lastname is null',message_th: 'ไม่พบข้อมูล lastname' })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            }if (level==="") {  const level=1 }
            const status=1
            const network_id=null
            const date = new Date()
            const emailchk = EmailValidator.validate(email) // true //false
            if (emailchk == false) {
                    reply.header('Access-Control-Allow-Methods', 'POST')
                    reply.header('statusCode', 500)
                    reply.header('status', false)  
                    reply.code(500).send({
                    status: false,
                    statusCode : 500,emailchk: emailchk,date: date,
                    message: 'This email is Invalid format ',
                    message_th: 'รูปแบบ email ไม่ถูกต้อง'
                }) 
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }
        const rs_email: any = await userModel.validation_email(db1, email)
        if (rs_email.length > 0) {
            reply.header('Access-Control-Allow-Methods', 'POST')
            reply.header('statusCode', 500)
            reply.header('status', false)  
            reply.code(500).send({
                title: { status: false, statusCode : 500,cache: 'no cache' },
                message: 'This email is duplicate data in the database system ',
                message_th: 'email นี้เป็นข้อมูลซ้ำในระบบฐานข้อมูล'
            })
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }const rs_username: any = await userModel.validation_username(db1, username)
            if (rs_username.length > 0) {
                    reply.header('Access-Control-Allow-Methods', 'POST')
                    reply.header('statusCode', 500)
                    reply.header('status', false)  
                    reply.code(500).send({
                        title: { status: false, statusCode : 500,cache: 'no cache' },
                        message: 'This username is duplicate data in the database system ',
                        message_th: 'username นี้เป็นข้อมูลซ้ำในระบบฐานข้อมูล'
                    }) 
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }  
        /**************************************************/    
            try {
                const encPassword = crypto.createHash('md5').update(password).digest('hex')
                const data: any = {}
                data.username = username
                data.password = encPassword
                data.password_temp = password
                data.firstname = firstname
                data.lastname = lastname
                data.email = email
                data.date = date
                data.level = level
                data.status = status
                data.network_id = network_id
                data.network_type_id = network_type_id
                const addrs: any = await userModel.create(db1, data) 
                const status_insert = 1
                const lastrs: any = await userModel.lastidread(db1)
                const luser: any = lastrs[0]
                const user_idx = luser.user_id 
                if (debug == 1) {
                    reply.code(500).send({  addrs: addrs,da: lastrs ,luser: luser,user_idx: user_idx,status_insert: status_insert  })
                    return  
                }
                var md5 = require('md5') 
                const enc_user_idx = md5(user_idx)
                const profile_id = enc_user_idx
                const data_array_update: any = {}
                data_array_update.profile_id = profile_id
                if(debug == 2) {
                    reply.code(200).send({ addrs: addrs,data_array_update: data_array_update, user_idx: user_idx })
                    return  
                }
                const upd: any = await userModel.where_sd_users_profile_id_update(db1, user_idx, data_array_update)
                const rs: any = await userModel.login(db1, username, encPassword)
                if (rs.length > 0) {
                const user: any = rs[0]
                console.log(user)
                        /******************************LOGIN*************************************/
                            var token = fastify.jwt.sign({
                                                        user_id: user.user_id,profile_id: user.profile_id,level: user.level,
                                                        username: user.username,email: user.email,
                                                        firstName: user.firstname,lastName: user.lastname,
                                                        state: getRandomString(32),  
                                                        expirein: expire_in
                                                    }, { expiresIn: expire_in })
                            const decoded: any= fastify.jwt.verify(token)
                            const jwtdata: any = {}
                            jwtdata.token = token
                            jwtdata.decoded = decoded  
                            jwtdata.expirein = expire_in
                            reply.header('version', 1)
                            reply.header('x-cache-status', 0) // 1=yes ,0=no 
                            reply.header('statusCode',200) 
                            /********************************/
                        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
                    // asycnhronously
                    fastify.jwt.verify(token, (err:any, decoded:any) => {
                    if (err) fastify.log.error(err)
                    fastify.log.info(`Token verified. Foo is ${decoded.foo}`)
                    })
                    const user_idx = user.user_id
                    const datars = {
                            uid:  user_idx,
                            username: user.username, 
                            email: user.email,
                            firstName: user.firstname,
                            lastName: user.lastname,
                            level: user.level,
                        }
                        reply.header('Access-Control-Allow-Methods', 'POST')
                        reply.header('message', 'Information Correct')
                        reply.header('statusCode', 200)
                        reply.header('status', true) 
                        reply.send({
                        title: { status: true, statusCode : 200,},
                        message: 'Register successfully,welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                        message_th: 'ลงทะเบียนสำเร็จ ,ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                        profile_id: enc_user_idx,
                    // decoded: decoded,
                        token
                    })
                    return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
                } else {
                    reply.code(401).send({ title: {status: false, statusCode : 401,}, message: 'Login failed!', message_th: 'ไม่พบข้อมูล username หรือ password ในระบบ' })
                    return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
                }

                /***********************************/
            } catch (error) {
                const status_insert = 0
                    console.log(error)
                    reply.header('Access-Control-Allow-Methods', 'POST')
                    reply.header('statusCode', 500)
                    reply.header('status', false)  
                    reply.header('message', error)  
                    reply.code(500).send({
                        title: { status: false, statusCode : 500,cache: 'no cache' },
                        message: 'register failed active code 500 error!',
                        message_th: ' ไม่สามารถลงทะเบียนได้',
                        error: error
                    })
                    return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            }
            
        } catch (error) {
            console.log(error)
                reply.header('Access-Control-Allow-Methods', 'POST')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.header('message', error) 
                reply.code(500).send({ title: {status: false, statusCode : 500,}, message: error })
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }
})
/**************************************************/
fastify.post('/singin',{ schema:singinSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
        const envPath = path.join(__dirname, '../.env') 
        require('dotenv').config({ path: envPath })
        const env = process.env 
        const opts = {}
        var TIMEEXPIRE : any = env.TIMEEXPIRE
        var TIMEEXPIRE_TOKEN : any =  env.TIMEEXPIRE_TOKEN
        var mode : any =  env.mode
        var client_id_conf: any =  env.client_id
        var access_token_key_conf : any =  env.access_token_key
        var secret_key_conf: any =  env.secret_key
        var scopenumber_conf: any =  env.scopenumber
        /*************************/
        const headers: any = request.headers // header
        const body: any = request.body // post 
        const query: any = request.query // ?xx=1
        const str: any = headers.authorization  
        var timeset : any = '7d' // 60, "2 days", "10h", "7d".
        var time : any = body.time
        // var expire_in : any = time || timeset
        var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
        // access token
        /*************************/
        var ma : any =env.mode // 0= ma
        const username = body.username
        const password = body.password
        try {
            if (ma == 1) { } else {
                reply.header('status', false)
                reply.header('statusCode', 500) 
                reply.code(500).send({
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                    status: false,
                    statusCode: 500,
                    statusrun: 0,
                    cache: 'no cache',
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
            var secret_key : any = body.secret_key
            if (secret_key === null) {
                reply.header('accesstoken', '')
                reply.header('statusCode', 500)
                reply.header('status', false)
                reply.header('message','forbidden access')  
                reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
            return  
            } else if (secret_key != secret_key_conf) {
                reply.header('accesstoken', '')
                reply.header('statusCode', 500)
                reply.header('status', false)
                reply.header('message','forbidden access')  
                reply.code(500).send({ message: 'secret_key is incorrect ,forbidden access ', message_th: 'secret_key ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง'})
            return  
            }
            if (username == '') {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({
                    title: { status: false, statusCode : 500, },
                    message: 'username is null', message_th: 'ไม่พบข้อมูล username'
                })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            } if (password == '') {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({
                    title: { status: false, statusCode : 500, },
                    message: 'password is null', message_th: 'ไม่พบข้อมูล password'
                })
                console.log(request.body)
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            }
            const encPassword = crypto.createHash('md5').update(password).digest('hex')
            const rs: any = await userModel.login(db1, username, encPassword)
            if (rs.length > 0) {
                const user: any = rs[0]
                console.log(user)
                /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
                /********************************/
                var token = fastify.jwt.sign({
                                            user_id: user.user_id,profile_id: user.profile_id,level: user.level,
                                            username: user.username,email: user.email,
                                            firstName: user.firstname,lastName: user.lastname,
                                            state: getRandomString(32),  
                                            expirein: expire_in
                                        }, { expiresIn: expire_in })
                const decoded: any= fastify.jwt.verify(token)
                const jwtdata: any = {}
                jwtdata.token = token
                jwtdata.decoded = decoded  
                jwtdata.expirein = expire_in
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no 
                reply.header('statusCode',200) 
                /********************************/

            /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            // asycnhronously
            fastify.jwt.verify(token, (err:any, decoded:any) => {
            if (err) fastify.log.error(err)
            fastify.log.info(`Token verified. Foo is ${decoded.foo}`)
            })
            const user_idx = user.user_id
            const datars = {
                    uid:  user_idx,
                    username: user.username, 
                    email: user.email,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    level: user.level,
                }
                const uid: any = user_idx
                const username: any = user.username
                const email: any = user.email
                var level: any = user.level
                if(level===null){ var level: any = 0 }
                const tokens: any = token
                /*****************/

                // Save data to sessionStorage
                // sessionStorage.setItem('key', 'value');
                // sessionStorage.setItem('token', tokens);
                // Get saved data from sessionStorage
                // let data = sessionStorage.getItem('key');
                // let datatoken = sessionStorage.getItem('token');
                // Remove saved data from sessionStorage
                // sessionStorage.removeItem('key');
                // Remove all saved data from sessionStorage
                // sessionStorage.clear();
                const MaxAge = 84000
                const set_cookie:any='token='+tokens+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
                const set_cookie1:any='username='+username+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
                const set_cookie2:any='email='+email+'; Max-Age='+MaxAge+'; SameSite=None; Secure'; 
                const set_cookie3: any = 'level=' + level + '; Max-Age=' + MaxAge + '; SameSite=None; Secure'; 
                const set_cookie4: any = 'uid=' + uid + '; Max-Age=' + MaxAge + '; SameSite=None; Secure';
                reply.header('Set-Cookie','visited=true; Max-Age='+MaxAge+'; HttpOnly, Secure');
                reply.header('Set-Cookie', set_cookie)
                reply.header('Set-Cookie', set_cookie1)
                reply.header('Set-Cookie', set_cookie2)
                reply.header('Set-Cookie', set_cookie3)
                reply.header('Set-Cookie', set_cookie4)
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 200)
                reply.header('status', true) 
                reply.send({
                    title: { status: true, statusCode : 200,cache: 'no cache' },
                    message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                    message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                    // data: datars, encoded: token,
                    // token:token,
                    // data: jwtdata,
                    timeset: timeset,
                    //datatoken: datatoken,
                    token
                })
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            } else {
                reply.code(401).send({
                    title: { status: true, statusCode : 200,cache: 'no cache' },
                    message: 'Login failed!', message_th: 'ไม่พบข้อมูล username หรือ password ในระบบ',TIMEEXPIRE: env.TIMEEXPIRE,
                })
                return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
            }
        } catch (error) {
            console.log(error)
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({
                    title: { status: false, statusCode : 500,cache: 'no cache' },
                    message: error,TIMEEXPIRE: env.TIMEEXPIRE,
                })
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }
})
/**************************************************/      
fastify.post('/resetpass', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500) 
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service tppy-tcas',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }if (ma == 911) {
            reply.header('status', false)
            reply.header('statusCode', 500) 
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service tppy-tcas',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก หรือปิดการใช้งาน',
            })
            return
        }
    } catch (error) { }
    
    const body: any = request.body
    const datareset = body.reset_valule 
    try {
        if (datareset === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'username or email is null',message_th: 'ไม่พบข้อมูล username หรือ email' })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }   
      const rs: any = await userModel.resetPassword(db1, datareset)
      if (rs.length > 0) {
          const user: any = rs[0]
          /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            var day = 1
            var TIMEEXPIRE =env.TIMEEXPIRE
            var time_expire_set:any= env.TIMEEXPIRE
            var time_expire_set1 = 300
            var time_setting :any= env.TIMEEXPIRE
            var today = new Date()
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            var dateTime = date + ' ' + time
            var issued_at=Date.now()
            var timestamp = Date.now()
            var expiration_time=issued_at+time_setting 
            const token = fastify.jwt.sign({
                user_id: user.user_id,level: user.level,
                username: user.username,email: user.email,
                // firstName: user.firstname,lastName: user.lastname,
                at: {
                        startdate: dateTime, 
                        issued_at: issued_at,
                        timeconfig: TIMEEXPIRE,
                        TIMEEXPIRE_TOKEN: env.TIMEEXPIRE_TOKEN,
                        state: getRandomString(32),  
                    },   
          })
         /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            const decoded: any = fastify.jwt.verify(token)
            var numpass: any =20
            const generatepwd: any = generatePassword(numpass)
            const newpassword: any = generatepwd
            const data: any = {} 
            const  newencpassword = crypto.createHash('md5').update(newpassword).digest('hex')
            const data_array: any = {} 
            data_array.password_temp = newpassword
            data_array.password = newencpassword
            await userModel.where_user_update_password_or(db1, datareset, data_array)
        // asycnhronously
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({
                title:{ status: true, statusCode : 200,},
                message: 'Reset password username ' + user.username + ' email ' + user.email+ ' new password is ' + generatepwd,
                message_th: 'ข้อมูลลืมรหัสผ่าน ' + user.username + ' email ' + user.email+ ' รหัสผ่านใหม่คือ ' + generatepwd,
                newpassword: generatepwd,
                data: token, TIMEEXPIRE : time_setting,
                input: { reset_valule: datareset }, //token: token,

            })
          console.log('query result :' + rs)
          return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      } else {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 401) 
            reply.header('status', false) 
            reply.code(401).send({  title:{ status: false, statusCode : 401,}, 
                                    message: 'username or email is do not have in database',
                                    message_th: 'ไม่พบข้อมูล username หรือ email ในระบบฐานข้อมูล',data: null,input: { reset_valule: datareset},  
            })
          return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
    } catch (error) {
      console.log(error)
      reply.code(500).send({ title: {status: false, statusCode : 500,},message: error+' ไม่พบข้อมูล username หรือ email ในระบบฐานข้อมูล' })
    }
})
/**************************************************/
fastify.post('/changepassword',{
    preValidation: [fastify.authenticate],schema: changepasswordSchema
    // ป้องกัน การใช้งาน โดย Token // validate schemas
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500) 
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service tppy-tcas',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }
    } catch (error) { }
    
    const body: any = request.body
    const username = body.username
    const user_id = body.user_id
    const oldpassword = body.oldpassword
    const newpassword = body.newpassword
    if (username === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500) 
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'username is null', message_th: 'ไม่พบข้อมูล username'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } if (oldpassword === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500) 
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'old password is null', message_th: 'ไม่พบข้อมูล old password'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } if (newpassword === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500) 
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'new password is null', message_th: 'ไม่พบข้อมูล new password'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } 
    /* Password Validator */
    var numpass: any =20
    const generatepwd: any = generatePassword(numpass)
    const passwordrt: any = passwordValidator(newpassword)
    if (passwordrt == false) {
        reply.header('version', 1)
        reply.header('x-cache-status', 0) // 1=yes ,0=no
        reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        reply.header('Expires', '-1')
        reply.header('Pragma', 'no-cache') // no-cache  private  public max-age=31536000 must-revalidate
        reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
        reply.header('message', 'Password not secure')
        reply.header('statusCode', 500) 
        reply.header('status', false)
        reply.header('Password', false)
        reply.code(500).send({
            title: {
                status: false,
                statusCode: 500,
                cache: 'no cache'
            },
            message: 'Password not secure ,Please set a new password, English only, with uppercase, lowercase, numbers and special characters.,mix together',
            message_th: ' รหัสผ่าน ไม่ปลอดภัย กรุณาตั้งรหัสผ่านใหม่ เป็นภาษาอังกฤษเท่านั้น ตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ ผสมกัน',
            generate_password:generatepwd
        })
        console.log(' passwordrt :'+passwordrt)
        return
    }
    
    try {
        /******************************ตรวจสอบ code active Token check*************************************/
      const data: any = {}
      data.username = username
      data.user_id = user_id
      data.oldpassword = oldpassword
      data.newpassword = newpassword 
      const encoldpassword = crypto.createHash('md5').update(oldpassword).digest('hex')
      const encnewpassword = crypto.createHash('md5').update(newpassword).digest('hex')
      const rsold: any = await userModel.login(db1, username, encoldpassword)
        if (rsold.length > 0) {

            const data_array: any = {} 
            data_array.password = encnewpassword
            data_array.password_temp = newpassword
            
            await userModel.where_user_update_password(db1, username, data_array)
          
        } else {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 401)
            reply.header('status', false) 
             reply.code(401).send({ status: false,statusCode : 401, message: 'change password failed! ',message_th: 'เปลี่ยนรหัสผ่านไม่สำเร็จ ไม่พบข้อมูล username หรือ password ในระบบ'  })
             return //reply.sent = true // exit loop ออกจากลูปการทำงาน 

        }

      const rs: any = await userModel.login(db1, username, encnewpassword)
      if (rs.length > 0) {
        const user: any = rs[0]
          console.log(user)
           /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            var day = 1
            var TIMEEXPIRE =env.TIMEEXPIRE
            var time_expire_set =  TIMEEXPIRE
            var time_expire_set1 = 300
            var timesetting : any = env.TIMEEXPIRE
            var today = new Date()
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            var dateTime = date + ' ' + time
            var issued_at=Date.now()
            var timestamp = Date.now()
            var expiration_time=issued_at+timesetting 
            const token = fastify.jwt.sign({
                user_id: user.user_id,level: user.level,
                username: user.username,email: user.email,
                // firstName: user.firstname,lastName: user.lastname,
                 at: {
                       startdate: dateTime, 
                        issued_at: issued_at,
                        timeconfig: TIMEEXPIRE,
                        TIMEEXPIRE_TOKEN: env.TIMEEXPIRE_TOKEN,
                        state: getRandomString(32),  
                    },
          })
         /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
         const decoded: any= fastify.jwt.verify(token)
        // asycnhronously
        fastify.jwt.verify(token, (err :any, decoded :any) => {
        if (err) fastify.log.error(err)
        fastify.log.info(`Token verified. Foo is ${decoded.foo}`)
        })
          const user_idx = user.user_id
          const datars = {
                uid:  user_idx,
                username: user.username, 
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                level: user.level,
          }
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({
                title: {status: true, statusCode : 200,cache:'no cache'},
                message: 'Change password done welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                message_th: ' เปลี่ยนรหัสผ่าน สำเร็จ ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                // data: datars, encoded: token,
                // data: decoded,
                token
            })
          return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      } else {
        reply.code(401).send({ status: false,statusCode : 401, message: 'Change password and Login failed or user is not active ! ',message_th: 'ไม่พบข้อมูล username หรือ password ในระบบ หรือ ยัง ไม่ได้ active user'  })
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
    } catch (error) {
      console.log(error)
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: error })
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    }
})
/**************************************************/
fastify.post('/changeemail',{
    preValidation: [fastify.authenticate],schema: changeemailSchema
    // ป้องกัน การใช้งาน โดย Token // validate schemas
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service tppy-tcas',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }
    } catch (error) { }
    
    const body: any = request.body
    const email = body.email 
    const newemail = email 
    const emailold = body.emailold 
    if (email === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'email is null', message_th: 'ไม่พบข้อมูล email'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } if (emailold === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'old email is null', message_th: 'ไม่พบข้อมูล  email เดิม'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } if (emailold === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'new email is null', message_th: 'ไม่พบข้อมูล new email'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } 
    const emailchk = EmailValidator.validate(email) // true //false
        if (emailchk == false) {
                reply.header('Access-Control-Allow-Methods', 'POST')
                reply.header('statusCode', 500)
                reply.header('status', false)  
                reply.code(500).send({
                status: false,
                statusCode : 500,emailchk: emailchk, 
                message: 'This email is Invalid format ',
                message_th: 'รูปแบบ email ไม่ถูกต้อง'
            }) 
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    }
    const rs_email: any = await userModel.validation_email(db1, email)
    if (rs_email.length > 0) {
        reply.header('Access-Control-Allow-Methods', 'POST')
        reply.header('statusCode', 500)
        reply.header('status', false)  
        reply.code(500).send({
            title: { status: false, statusCode : 500,cache: 'no cache' },
            message: 'This email is duplicate data in the database system ',
            message_th: 'email นี้เป็นข้อมูลซ้ำในระบบฐานข้อมูล'
        })
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    }

    /* Password Validator */
 
    try {
        /******************************ตรวจสอบ code active Token check*************************************/
      const data_array: any = {} 
      data_array.email = newemail 
      await userModel.where_user_update_mail(db1, emailold, data_array)
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 200)
        reply.header('status', true) 
        reply.send({
                title: {status: true, statusCode : 200,cache:'no cache'},
                message: 'Change email successfully',
                message_th: ' เปลี่ยนรหัส email สำเร็จ ',
            })
          return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
       
    } catch (error) {
      console.log(error)
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: error })
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    }
})
/**************************************************/      
fastify.post('/activecode',{preValidation: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body
    const code = body.code
    if (code === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'code is null',message_th: 'ไม่พบข้อมูล code' })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        } 
    try {
        /******************************ตรวจสอบ code active Token check*************************************/
        var res = code  
        let ids = request.id
         const decoded: any= fastify.jwt.verify(res)
        const user_id = decoded['user_id']
        const sd_users_profile: any = await userModel.sd_users_profile(db1, user_id)
        const level = decoded['level']
        const username = decoded['username']
            const data_array: any = {}
            data_array.status = 1
            await userModel.updateuid(db1, user_id, data_array)
            reply.header('Access-Control-Allow-Methods', 'POST')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
                    reply.send({  // แสดงข้อมูล api
                        title: {
                        status: 200,statusCode : 200,cache:'no cache'
                        },  
                        data: {
                            error: null, 
                            user_id: user_id, level: level, username: username, 
                        },
                        sd_users_profile: sd_users_profile,
                    })
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
       return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } catch (error) {
      console.log(error)
      reply.header('Access-Control-Allow-Methods', 'POST')
      reply.header('message', 'Information Correct')
      reply.header('statusCode', 500)
      reply.code(500).send({ // แสดงข้อมูล api
                        title: {
                                    title: {status: false, statusCode : 500,}, message: 'Results unsuccessful',message_th: 'แสดง ข้อมูลไม่สำเร็จ',cache:'no cache'
                            },  
                                error: error,
                                data: null
      })
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
        
})
/**************************************************/
fastify.get('/activecode',{preValidation: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body
    const query: any = request.query
    const code: any =  query.code
    var res : any = code  
    if (code == "") {
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false)
        reply.code(500).send({
            status: false,
            statusCode : 500, message: 'code is null',
            message_th: 'ไม่พบข้อมูล code'
        })
        console.log(request.body)
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } 
    try {
        
        /******************************ตรวจสอบ code active Token check*************************************/
        let ids = request.id
         const decoded: any= fastify.jwt.verify(res)
        const user_id = decoded['user_id']
        const sd_users_profile: any = await userModel.sd_users_profile(db1, user_id)
        const level = decoded['level']
        const username = decoded['username']
            const expired_status = 1
            const status = true
            const code = 200
            const data_array: any = {}
            data_array.status = 1
            await userModel.updateuid(db1, user_id, data_array)
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
                    reply.send({  // แสดงข้อมูล api
                        title: {
                        status: status,statusCode : code,
                        },  
                        data: {
                            error: null,expired_status: expired_status, 
                            user_id: user_id, level: level, username: username, 
                        },
                        sd_users_profile: sd_users_profile,
                    })
         
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
       return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } catch (error) {
      console.log(error)
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ // แสดงข้อมูล api
                                title: {
                                            status: false,statusCode : 500, message: 'Results unsuccessful',message_th: 'แสดง ข้อมูลไม่สำเร็จ',cache:'no cache'
                                    },  
                                        error: error,
                                        data: null
            })
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
        
})
/**************************************************/
/*ป้องกัน การใช้งาน โดย Token */
fastify.post('/verify',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
    const headers: any = request.headers // header
    const body: any = request.body // post 
    const query: any = request.query // ?xx=1 
    const str: any = request.headers.authorization  // token in Bearer  header
    const token: any = str.replace("Bearer ", "")  
    const token_bearer: any = fastify.jwt.verify(token) 
    const jwtdata: any = {}
    jwtdata.token = token_bearer 
    var start_token= token_bearer.iat
    var end_token = token_bearer.exp
    jwtdata.start_token= start_token
    jwtdata.end_token = end_token
    var time_expire_setting= end_token-start_token
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    var numberValuenow: any = Math.round(now/1000)
    jwtdata.now = numberValuenow 
    let expire_in_time = (end_token-numberValuenow) 
    jwtdata.time_expire_setting= time_expire_setting 
    jwtdata.expire_in= expire_in_time 
    jwtdata.token= token 
    jwtdata.decode= token_bearer
    /*****************************************************/
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no 
    reply.header('statusCode',200) 
    reply.code(200).send({
        title: { status: true, statusCode: 200},  
        message: 'jwt verify',
        message_th: 'ถอดรหัส jwt',
        data: jwtdata,
        // token: token,
        // str: str,
        // headers: headers, body: body,query: query,
        }) 
}) 
/*****************************************************/       
/*ป้องกัน การใช้งาน โดย Token */
fastify.post('/verifyauthen',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
    const headers: any = request.headers // header
    const body: any = request.body // post 
    const query: any = request.query // ?xx=1 
    const str: any = request.headers.authorization  // token in Bearer  header
    const token: any = str.replace("Bearer ", "")  
    const token_bearer: any = fastify.jwt.verify(token) 
    const jwtdata: any = {}
    jwtdata.token = token_bearer 
    var start_token= token_bearer.iat
    var end_token = token_bearer.exp
    jwtdata.start_token= start_token
    jwtdata.end_token = end_token
    var time_expire_setting= end_token-start_token
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    var numberValuenow: any = Math.round(now/1000)
    jwtdata.now = numberValuenow 
    let expire_in_time = (end_token-numberValuenow) 
    jwtdata.time_expire_setting= time_expire_setting 
    jwtdata.expire_in= expire_in_time 
    jwtdata.token= token 
    jwtdata.decode= token_bearer
    /*****************************************************/
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no 
    reply.header('statusCode',200) 
    reply.code(200).send({
        title: { status: true, statusCode: 200},  
        message: 'jwt verify',
        message_th: 'ถอดรหัส jwt',
        data: jwtdata,
        // token: token,
        // str: str,
        // headers: headers, body: body,query: query,
        }) 
}) 
/**************************************************/
fastify.route({
  method: 'GET',
  url: '/testopts',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
    handler: function (request, reply) {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.header('lang', 'th')
            reply.send({ hello: 'world' })
  }
})
/**************************************************/
fastify.get('/test_handler_schema', {
        handler(req, reply) {
            const body: any = req.body
            const query: any = req.query
            const id = query.id
            const name = query.name
            const image = query.image
            if (id == '') {
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                reply.code(500).send({
                    title: { status: false, statusCode: 500, },
                    message: 'id is null and id must is number only',
                    message_th: 'ไม่พบข้อมูล id type id ต้องเป็นตัวเลขเท่านั้น'
                })
                console.log(query)
                return // ออกจากลูปการทำงาน 
            }   
            
            // reply.header('Access-Control-Allow-Origin', '*')
            // reply.header('Content-Type', 'application/json')
            // reply.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
            // reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
            // reply.header('Auth', 'X-Auth-Token')
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({id: id, name: name, image: image })
    },
    schema: {
            response: {
            '2xx': {
                id: { type: 'number' },
                name: { type: 'string' } 
            }
            }
        }
})
/**************************************************/
fastify.get('/mode', async (request: FastifyRequest, reply: FastifyReply) => {
        var mode = 1
        reply.header('version', 1)
        reply.header('x-cache-status', 0) // 1=yes ,0=no
        reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        reply.header('Expires', '-1')
        reply.header('Pragma', 'no-cache') 
        // no-cache  private  public max-age=31536000 must-revalidate
        reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
        reply.header('message', 'Working')
       
        /*****************************************************/
        if (mode == 1) {
          reply.header('status', true) 
          reply.header('statusCode', 200)
          reply.code(200).send({
                  status: true,
                  statusCode: 200,
                  statusrun: 1,
                  cache: 'no cache',
                  nameservice: 'Micro service tppy-tcas',
                  message: 'The system works in normal mode.',
                  message_th: 'ระบบทำงาน ในโหมดปกติ',
                })
        } else {
          reply.header('status', false) 
          reply.header('statusCode', 500)
          reply.code(500).send({
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service tppy-tcas',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
              })
        
       }
      /*****************************************************/
      console.log(request.body) 
})
/**************************************************/     
fastify.post('/jwtsingin', async (request: FastifyRequest, reply: FastifyReply) => {
        const headers: any = request.headers // header
        const body: any = request.body // post 
        const query: any = request.query // ?xx=1
        const str: any = headers.authorization  
        var timeset : any = '7d' // 60, "2 days", "10h", "7d".
        var time : any = body.time
       // var expire_in : any = time || timeset
        var expire_in : any = time || TIMEEXPIRE || timeset
        var token = fastify.jwt.sign({ name: 'demo',expirein: expire_in },{ expiresIn: expire_in})
        const decoded = fastify.jwt.decode(token)
        const jwtdata: any = {}
        jwtdata.token = token
        jwtdata.decoded = decoded  
        jwtdata.expirein = expire_in
        /*************************/
        reply.header('version', 1)
        reply.header('x-cache-status', 0) // 1=yes ,0=no 
        reply.header('statusCode',200) 
        reply.code(200).send({
              title: { status: true, statusCode: 200},  
              message: 'jwt sign',
              message_th: 'เข้ารหัสรหัส jwt',
              data: jwtdata, timeset: timeset,
            body: body,expire_in: expire_in,
            headers: headers,
            }) 
}) 

fastify.post('/jwtverify',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
    const headers: any = request.headers // header
    const body: any = request.body // post 
    const query: any = request.query // ?xx=1 
    const str: any = request.headers.authorization  // token in Bearer  header
    const token: any = str.replace("Bearer ", "")  
    const token_bearer: any = fastify.jwt.verify(token) 
    const jwtdata: any = {}
    jwtdata.token = token_bearer 
    var start_token= token_bearer.iat
    var end_token = token_bearer.exp
    jwtdata.start_token= start_token
    jwtdata.end_token = end_token
    var time_expire_setting= end_token-start_token
    let date: any =  Date.now()
    var nowseconds = new Date().getTime()
    var now: any = nowseconds
    var numberValuenow: any = Math.round(now/1000)
    jwtdata.now = numberValuenow 
    let expire_in_time = (end_token-numberValuenow) 
    jwtdata.time_expire_setting= time_expire_setting 
    jwtdata.expire_in= expire_in_time 
    jwtdata.token= token 
    jwtdata.decode= token_bearer
    /*****************************************************/
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no 
    reply.header('statusCode',200) 
    reply.code(200).send({
        title: { status: true, statusCode: 200},  
        message: 'jwt verify',
        message_th: 'ถอดรหัส jwt',
        data: jwtdata,
        // token: token,
        // str: str,
        // headers: headers, body: body,query: query,
        }) 
}) 
/*****************************************************/
fastify.post('/accesstoken',{schema: accesstokenSchema}, async (request: FastifyRequest, reply: FastifyReply) => {
    // import * as path from 'path'
    const envPath = path.join(__dirname, '../.env') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const opts = {}
    var TIMEEXPIRE : any = env.TIMEEXPIRE
    var TIMEEXPIRE_TOKEN : any =  env.TIMEEXPIRE_TOKEN
    var mode : any =  env.mode
    var client_id_conf: any =  env.client_id
    var access_token_key_conf : any =  env.access_token_key
    var secret_key_conf: any =  env.secret_key
    var scopenumber_conf: any =  env.scopenumber
    /*************************/
    const headers: any = request.headers // header
    const body: any = request.body // post 
    const query: any = request.query // ?xx=1
    const str: any = headers.authorization  
    var timeset : any = '7d' // 60, "2 days", "10h", "7d".
    var time : any = body.time
    // var expire_in : any = time || timeset
    var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
    // access token
    /*************************/
    try {
        var client_id : any = body.client_id
        if (client_id === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'client_id is empty ,forbidden access ', message_th: 'ไม่พบ client_id ไม่อนุญาตให้เข้าถึง ระบบ'})
           return  
        } else if (client_id != client_id_conf) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'client_id is incorrect ,forbidden access ', message_th: 'client_id ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง'})
           return  
        }
        var secret_key : any = body.secret_key
        if (secret_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
           return  
        } else if (secret_key != secret_key_conf) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is incorrect ,forbidden access ', message_th: 'secret_key ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง'})
           return  
        }
        var access_token_key : any = body.access_token_key
        if (access_token_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
           return  
        } else if (access_token_key != access_token_key_conf) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'access_token_key is incorrect ,forbidden access ', message_th: 'access_token_key ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง'})
           return  
        }
        /********************************/
        var token = fastify.jwt.sign({ status_allow :1,allow_message : 'welcome to api',expirein: expire_in },{ expiresIn: expire_in})
        const decoded = fastify.jwt.decode(token)
        const jwtdata: any = {}
        jwtdata.token = token
        jwtdata.decoded = decoded  
        jwtdata.expirein = expire_in
        reply.header('version', 1)
        reply.header('x-cache-status', 0) // 1=yes ,0=no 
        reply.header('statusCode',200) 
        reply.code(200).send({
            title: { status: true, statusCode: 200},  
            message: 'allow api welcome',
            message_th: 'อนุญาต ให้เข้าถึง ระบบ api ยินดีต้อนรับ',
            token:token,
            // data: jwtdata,
            timeset: timeset,
            // body: body,expire_in: expire_in,
            // headers: headers,
            }) 
        /********************************/
    } catch (error) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message', error)  
            reply.code(500).send({ resporn: 'forbidden access', message: error})
           return  
        }
}) 
fastify.post('/private', { preValidation: [fastify.authenticate] },async (request: FastifyRequest, reply: FastifyReply) => {
  reply.header('version', 1)
  reply.header('x-cache-status', 0) // 1=yes ,0=no
  reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  reply.header('Expires', '-1')
  reply.header('Pragma', 'no-cache')  
  reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
  reply.header('message', 'Working')
  reply.header('statusCode', 200)
  reply.header('status', true) 
  /*****************************************************/
  reply.send({
       title: {
          message: "Allow Protected area!  allow access to the system",
          message_th: "Protected area อนุญาตให้เข้าถึงระบบ!",
                status: true,
                status_int: 1,
                statusCode : 200, 
            }, 
        body: { data: null,  }, 
  })
}) 
fastify.post('/signtest', async (request: FastifyRequest, reply: FastifyReply) => {
    const test: any = getRandomString(36);
    const token = fastify.jwt.sign({data: test,})
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no
    reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    reply.header('Expires', '-1')
    reply.header('Pragma', 'no-cache')  
    reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    reply.header('message', 'Working')
    reply.header('statusCode', 200)
    reply.header('status', true) 
    /*****************************************************/
    reply.send({ title: {
                  message: "Create token",
                  message_th: "สร้างโทเค็น",
                  status: true,
                  status_int: 1,
                  statusCode : 200, 
                  },  
              token })
})
/*****************************************************/
} 

