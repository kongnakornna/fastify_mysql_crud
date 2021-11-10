import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as knex from 'knex'
import * as crypto from 'crypto'
/************* nodemailer*******************/ 
import { AuthadminModel } from '../../../modules/administrator/models/authadmin_model' 
/**************Models************************************/ 
/************* validate schemas*******************/
import bodySchema from '../../../modules/administrator/schemas/body'
import bodysingupSchema from '../../../modules/administrator/schemas/bodysingup'
import singinSchema  from '../../../modules/administrator/schemas/singinSchema' 
import paramsSchema from '../../../modules/administrator/schemas/params'
import queryStringSchema from '../../../modules/administrator/schemas/query_string'
import headerSchema from '../../../modules/administrator/schemas/header'
/************* validate schemas*******************/
import changepasswordSchema from '../../../modules/administrator/schemas/changepasswordSchema' 
import changeemailSchema from '../../../modules/administrator/schemas/changeemailSchema' 
import * as path from 'path'
const envPath = path.join(__dirname, '../../../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const mode = env.mode
// console.log("mode: ", mode)
// env.DB1_HOST
// TypeScript
import * as EmailValidator from 'email-validator'
// function name auth
export default async function auth(fastify: FastifyInstance) {
    const AuthModels = new AuthadminModel()
const db1: knex = fastify.db1
/**************************************************/  
function passwordValidator(inputtxt: any){ 
        var paswd :any=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(inputtxt.match(paswd)){  
            console.log('validate password  Correct, try another...:'+inputtxt);
            return true;
        }else{  
                console.log('validate password Wrong...:'+inputtxt);
            return false;
        }
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
fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        /*******var**************/
        var ma : any =env.mode // 0= ma
        try {
            if (ma == 1) { } else {
                reply.header('status', false)
                reply.header('statusCode', 500)
                reply.header('code', 500)
                reply.code(500).send({
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                    status: false,
                    statusCode: 500,
                    statusrun: 0,
                    cache: 'no cache',
                    nameservice: 'Micro service 1',
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
                reply.header('code', 200)
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
fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500)
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
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
                reply.header('code', 200)
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
fastify.get('/genint',{preValidation: [fastify.genint]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/genint',{preValidation: [fastify.genint]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/getstate',{preValidation: [fastify.getstate]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/getstate',{preValidation: [fastify.getstate]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/clientsecret',{preValidation: [fastify.clientsecret]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/clientsecret',{preValidation: [fastify.clientsecret]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/codegenclientid',{preValidation: [fastify.codegen]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/codegenclientid',{preValidation: [fastify.codegen]}, async (request: FastifyRequest, reply: FastifyReply) => {})  
fastify.post('/singup',{ schema:bodysingupSchema  },  async (request: FastifyRequest, reply: FastifyReply) => {
    //var debug: any =0
    const body: any = request.body
    const debug : any =  body.debug
    if (debug == 1) {
        reply.code(500).send({
            debug_body: body,
        })
        return   // exit loop ออกจากลูปการทำงาน 
    } 
    const username = body.username
    const password = body.password
    const email = body.email
    if (username === "") { const username = body.email }
    const firstname = body.firstname
    const lastname = body.lastname
    const level = body.level
    if (level === "") { const level = 2 }
    const network_id = body.network_id
    if (network_id === "") { const network_id = 'api_id' }
    const network_type_id = body.network_type_id
    if (network_type_id === "") { const network_type_id = 1 }
    const role_id = body.role_id
    if (role_id === "") { const role_id = 2 }
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
            reply.header('code', 500)
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
    const rs_email: any = await AuthModels.validation_email(db1, email)
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
    }const rs_username: any = await AuthModels.validation_username(db1, username)
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
            if (network_id === "") { const network_id = 'app' }
            data.network_id = network_id
            data.network_type_id = network_type_id
            data.role_id = role_id

            if (debug == 2) {
                reply.code(500).send({
                    debug: 2,
                    db1: db1,
                    data: data,
                })
                return   // exit loop ออกจากลูปการทำงาน 
            } 
            
            const addrs: any = await AuthModels.create(db1, data) 
            if (debug == 3) {
                reply.code(500).send({
                    debug: 3, 
                    data: addrs,
                })
                return   // exit loop ออกจากลูปการทำงาน 
            } 
            const status_insert = 1
            const lastrs: any = await AuthModels.lastidread(db1)
            const luser: any = lastrs[0]
            const user_idx = luser.user_id 
            
            // reply.code(500).send({ da: lastrs ,luser: luser,user_idx: user_idx,status_insert: status_insert  })
            // return   // exit loop ออกจากลูปการทำงาน 
            
                var md5 = require('md5')
                const enc_user_idx = md5(user_idx)
                const data_array: any = {}
                const profileid = enc_user_idx
                data_array.profile_id = profileid
                const upd: any = await AuthModels.where_ad_administrator_profile_id_update(db1, user_idx,data_array)
                const rs: any = await AuthModels.login(db1, username, encPassword)
                /*
                    reply.code(500).send({
                        data_array: data_array,
                        user_idx: user_idx,
                        rs: rs, 
                        addrs: addrs,
                        profileid: profileid, 
                        db1: db1, 
                        status_insert: status_insert,
                        upd: upd, 
                    })
                    return   // exit loop ออกจากลูปการทำงาน 
                */
                if (rs.length > 0) {
                const user: any = rs[0]
                console.log(user)
                    /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
                        var day = 1
                        var TIMEEXPIRE =env.TIMEEXPIRE
                        var time_expire_set :any = env.TIMEEXPIRE
                        var time_expire_set1 = 300
                        var time_setting :any = env.TIMEEXPIRE
                        var TIMEEXPIRE_TOKEN :any = env.TIMEEXPIRE_TOKEN
                        var today = new Date() 
                        var issued_at=Date.now()
                        const token = fastify.jwt.sign({
                            user_id: luser.user_id, 
                            role_id: luser.role_id,
                            username: luser.username,
                            email: luser.email,
                            firstName: user.firstname,lastName: user.lastname,
                            at: { 
                                issued_at: issued_at,
                                timeconfig: TIMEEXPIRE,
                                TIMEEXPIRE_TOKEN: env.TIMEEXPIRE_TOKEN,
                                state: getRandomString(32),  
                            },                  
                    }, {expiresIn: env.TIMEEXPIRE_TOKEN }) 
                    /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
                const decoded: any= fastify.jwt.verify(token)
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
                    message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                    message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                    // data: datars, encoded: token,
                    enc_user_idx: enc_user_idx,
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
                    message: 'singup failed!',
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
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500)
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }
    } catch (error) { }
    
    const body: any = request.body
    const username = body.username
    const password = body.password
    try {
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
    const rs: any = await AuthModels.login(db1, username, encPassword)
    if (rs.length > 0) {
        const user: any = rs[0]
        console.log(user)
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            const day = 1
            const time_expire_set :any = env.TIMEEXPIRE
            const time_expire_set1 = 300
            const time_setting  :any = env.TIMEEXPIRE
            const today = new Date()
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            const dateTime = date + ' ' + time
            const issued_at=Date.now()
            const timestamp = Date.now()
            const expiration_time=issued_at+time_setting 
            const token = fastify.jwt.sign({
                user_id: user.user_id,level: user.level,
                username: user.username,email: user.email,
                firstName: user.firstname,lastName: user.lastname,
                at: {
                    startdate: dateTime, 
                    issued_at: issued_at,
                    time_expired: expiration_time,
                    time_setting: time_setting,
                    day_expired: day, 
                    timeconfig: TIMEEXPIRE,
                    state: getRandomString(32),  
                    },  
        })
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
        const decoded: any= fastify.jwt.verify(token)
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
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({
                title: { status: true, statusCode : 200,cache: 'no cache' },
                message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                // data: datars, encoded: token,
                TIMEEXPIRE: env.TIMEEXPIRE,
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
//fastify.post('/singin',{ schema:singinSchema  }, async (request: FastifyRequest, reply: FastifyReply) => {
fastify.post('/singinv1',async (request: FastifyRequest, reply: FastifyReply) => {
        const req: any = request
        if (req == '') {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'request is null')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'request is null',message_th: 'ไม่พบข้อมูล request' })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }
        var ma : any =env.mode // 0= ma
        try {
            if (ma == 1) { } else {
                reply.header('status', false)
                reply.header('statusCode', 500)
                reply.header('code', 500)
                reply.code(500).send({
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                    status: false,
                    statusCode: 500,
                    statusrun: 0,
                    cache: 'no cache',
                    nameservice: 'Micro service 1',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
    const body: any = request.body
    const username = body.username
    const password = body.password
    const state: any =getRandomString(32)
    try {
        if (username == '') {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'username is null',message_th: 'ไม่พบข้อมูล username' })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        } if (password == '') {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'password is null',message_th: 'ไม่พบข้อมูล password' })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
        }
      const encPassword = crypto.createHash('md5').update(password).digest('hex')
      const rs: any = await AuthModels.login(db1, username, encPassword)
      if (rs.length > 0) {
            const user: any = rs[0]
            const userids: any = user.user_id
            const userid = fastify.jwt.sign({userids})
            console.log(user)
            /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
                var day = 1
                var TIMEEXPIRE =env.TIMEEXPIRE
                var time_expire_set :any = env.TIMEEXPIRE
                var time_expire_set1 = 300
                var time_setting :any = env.TIMEEXPIRE
                var TIMEEXPIRE_TOKEN :any = env.TIMEEXPIRE_TOKEN
                var today = new Date()
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                var dateTime = date + ' ' + time
                var issued_at=Date.now()
                const token = fastify.jwt.sign({
                    user_id: user.id,
                    role_id: user.role_id,
                    username: user.username,
                    email: user.email,
                    // firstName: user.firstname,lastName: user.lastname,
                    at: {
                        startdate: dateTime, 
                        issued_at: issued_at,
                        timeconfig: TIMEEXPIRE,
                        TIMEEXPIRE_TOKEN: env.TIMEEXPIRE_TOKEN,
                        state: getRandomString(32),  
                    },                  
            }, {expiresIn: env.TIMEEXPIRE_TOKEN }) 
            /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            const decoded: any = fastify.jwt.verify(token)
            //  fastify.setLocal('token', token)
            // asycnhronously
            fastify.jwt.verify(token, (err :any, decoded : any) => {
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
            reply.header('user_idx', user_idx)
            reply.header('token', token)
            reply.header('time_expire', time_expire_set)
            
            reply.send({
                title:{ status: true, statusCode : 200,},
                message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                // data: datars, encoded: token,
                TIMEEXPIRE : time_setting,
                token
            })
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      } else {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 401)
                reply.header('code', 401)
            reply.header('status', false) 
        reply.code(401).send({ status: false,statusCode : 401, message: 'Login failed or user is not active ! ',message_th: 'ไม่พบข้อมูล username หรือ password ในระบบ หรือ ยัง ไม่ได้ active user'  })
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
    } catch (error) {
      console.log(error)
      reply.code(500).send({ title: {status: false, statusCode : 500,},message: error })
      return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    }
})
fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500)
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }
    } catch (error) { }
    
    const body: any = request.body
    const username = body.username
    const password = body.password
    try {
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
    const rs: any = await AuthModels.login(db1, username, encPassword)
    if (rs.length > 0) {
        const user: any = rs[0]
        console.log(user)
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
            const day = 1
            const time_expire_set :any = env.TIMEEXPIRE
            const time_expire_set1 = 300
            const time_setting  :any = env.TIMEEXPIRE
            const today = new Date()
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            const dateTime = date + ' ' + time
            const issued_at=Date.now()
            const timestamp = Date.now()
            const expiration_time=issued_at+time_setting 
            const token = fastify.jwt.sign({
                user_id: user.user_id,level: user.level,
                username: user.username,email: user.email,
                // firstName: user.firstname,lastName: user.lastname,
                at: {
                    startdate: dateTime, 
                    issued_at: issued_at,
                    time_expired: expiration_time,
                    time_setting: time_setting,
                    day_expired: day, 
                    timeconfig: TIMEEXPIRE,
                    state: getRandomString(32),  
                    },  
        })
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
        const decoded: any= fastify.jwt.verify(token)
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
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({
                title: { status: true, statusCode : 200,cache: 'no cache' },
                message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
                message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
                // data: datars, encoded: token,
                TIMEEXPIRE: env.TIMEEXPIRE,
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
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
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
      const rs: any = await AuthModels.resetPassword(db1, datareset)
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
         const decoded: any= fastify.jwt.verify(token)
        // asycnhronously
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({
                title:{ status: true, statusCode : 200,},
                message: 'Reset password username ' + user.username + ' email ' + user.email,
                message_th: 'ข้อมูลลืมรหัสผ่าน ' + user.username + ' email ' + user.email,
                data: token, TIMEEXPIRE : time_setting,
                input: { reset_valule: datareset }, //token: token,

            })
          console.log('query result :' + rs)
          return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      } else {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 401)
                reply.header('code', 401)
            reply.header('status', false) 
            reply.code(401).send({  title:{ status: false, statusCode : 401,}, 
                                    message: 'username or email is do not have in database',
                                    message_th: 'ไม่พบข้อมูล username หรือ email ในระบบฐานข้อมูล',data: null,input: { reset_valule: datareset},  
            })
          return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
    } catch (error) {
      console.log(error)
      reply.code(500).send({ title: {status: false, statusCode : 500,},message: error })
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
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
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
            reply.header('code', 500)
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
            reply.header('code', 500)
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
            reply.header('code', 500)
            reply.header('status', false) 
            reply.code(500).send({
                title: { status: false, statusCode : 500, },
                message: 'new password is null', message_th: 'ไม่พบข้อมูล new password'
            })
            console.log(request.body)
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } 
    /* Password Validator */
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
        reply.header('code', 500)
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
    
    try {
        /******************************ตรวจสอบ code active Token check*************************************/
      const data: any = {}
      data.username = username
      data.user_id = user_id
      data.oldpassword = oldpassword
      data.newpassword = newpassword 
      const encoldpassword = crypto.createHash('md5').update(oldpassword).digest('hex')
      const encnewpassword = crypto.createHash('md5').update(newpassword).digest('hex')
      const rsold: any = await AuthModels.login(db1, username, encoldpassword)
        if (rsold.length > 0) {

            const data_array: any = {} 
            data_array.password = encnewpassword
            data_array.password_temp = newpassword
            
            await AuthModels.where_user_update_password(db1, username, data_array)
          
        } else {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 401)
            reply.header('code', 401)
            reply.header('status', false) 
             reply.code(401).send({ status: false,statusCode : 401, message: 'change password failed! ',message_th: 'เปลี่ยนรหัสผ่านไม่สำเร็จ ไม่พบข้อมูล username หรือ password ในระบบ'  })
             return //reply.sent = true // exit loop ออกจากลูปการทำงาน 

        }

      const rs: any = await AuthModels.login(db1, username, encnewpassword)
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
            reply.header('code', 200)
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
            reply.header('code', 500)
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
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
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
            reply.header('code', 500)
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
            reply.header('code', 500)
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
            reply.header('code', 500)
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
    const rs_email: any = await AuthModels.validation_email(db1, email)
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
      await AuthModels.where_user_update_mail(db1, emailold, data_array)
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 200)
        reply.header('code', 200)
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
            reply.header('code', 500)
            reply.header('status', false) 
            reply.code(500).send({ title: {status: false, statusCode : 500,},message: error })
            return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    }
})
/**************************************************/      
fastify.post('/activecode', async (request: FastifyRequest, reply: FastifyReply) => {
    var ma : any =env.mode // 0= ma
    try {
        if (ma == 1) { } else {
            reply.header('status', false)
            reply.header('statusCode', 500)
            reply.header('code', 500)
            reply.code(500).send({
                title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
            })
            return
        }
    } catch (error) { }
    
    const body: any = request.body
    const code = body.code
    if (code === "") {
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('code', 500)
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
        const ad_administrator_profile: any = await AuthModels.ad_administrator_profile(db1, user_id)
        const level = decoded['level']
        const username = decoded['username']
        const at = decoded['at']
        const startdate = at['startdate']
        const issued_at = at['issued_at']
        const time_setting:any =  at['time_setting']*100
        const time_expired = at['time_expired']
        const day_expired = at['day_expired']
        const timeconfig = at['timeconfig']
        
        var now = Date.now()
        var time_settings =time_setting
        var timestamp_cul = now - issued_at 
        var timestamp_culs =timestamp_cul
        if (timestamp_culs > time_settings) {
            const msg_time = 'Token Expired : โทเค็นหมดอายุ'
            const msg_time_th = 'โทเค็นหมดอายุ'
            const msg_time_en = 'Token Expired '
            const expired_status = 0
            const status = false
            const code = 500
                    reply.send({  // แสดงข้อมูล api
                        title: {
                        status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                        },  
                        data: null, ad_administrator_profile: null
                    })
        }else {
            const msg_time = 'Token Not Expired : โทเค็นยังไม่หมดอายุ active code satatus complate'
            const msg_time_th = 'โทเค็นยังไม่หมดอายุ active code satatus complate'
            const msg_time_en = 'Token Not Expired  active code satatus complate'
            const expired_status = 1
            const status = true
            const code = 200

            const data_array: any = {}
            data_array.status = 1
            await AuthModels.updateuid(db1, user_id, data_array)
            reply.header('Access-Control-Allow-Methods', 'POST')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('code', 200)
            reply.header('status', true) 
                    reply.send({  // แสดงข้อมูล api
                        title: {
                        status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                        },  
                        data: {
                            error: null, timeconfig: timeconfig,time: timestamp_cul,living_time:time_settings,expired_status: expired_status,
                           // msg_time: msg_time, 
                            user_id: user_id, level: level, username: username,
                           // startdate: startdate, time_expired: time_expired, time_setting: time_setting, issued_at: issued_at, now: now, time_cul: timestamp_cul,
                        },
                        ad_administrator_profile: ad_administrator_profile,
                    })
        }
        console.log('at jwt :'+at) 
        /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
       return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
    } catch (error) {
      console.log(error)
      reply.header('Access-Control-Allow-Methods', 'POST')
      reply.header('message', 'Information Correct')
      reply.header('code', 500)
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
fastify.get('/activecode', async (request: FastifyRequest, reply: FastifyReply) => {
    		var ma : any =env.mode // 0= ma
        try {
            if (ma == 1) { } else {
                reply.header('status', false)
                reply.header('statusCode', 500)
                reply.header('code', 500)
                reply.code(500).send({
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                    status: false,
                    statusCode: 500,
                    statusrun: 0,
                    cache: 'no cache',
                    nameservice: 'Micro service 1',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
    const body: any = request.body
    const query: any = request.query
    const code = query.code
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
        var res = code  
        let ids = request.id
         const decoded: any= fastify.jwt.verify(res)
        const user_id = decoded['user_id']
        const ad_administrator_profile: any = await AuthModels.ad_administrator_profile(db1, user_id)
        const level = decoded['level']
        const username = decoded['username']
        const at = decoded['at']
        const startdate = at['startdate']
        const issued_at = at['issued_at']
        const time_setting :any = at['time_setting']*100
        const time_expired = at['time_expired']
        const day_expired = at['day_expired']
        const timeconfig = at['timeconfig']
        var now = Date.now()
        var time_settings =time_setting
        var timestamp_cul  : any =  now - issued_at 
        var timestamp_culs  : any = timestamp_cul
        if (timestamp_culs > time_settings) {
            const msg_time = 'Token Expired : โทเค็นหมดอายุ'
            const msg_time_th = 'โทเค็นหมดอายุ'
            const msg_time_en = 'Token Expired '
            const expired_status = 0
            const status = false
            const code = 500
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
                    reply.send({  // แสดงข้อมูล api
                        title: {
                        status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                        },  
                        data: null, ad_administrator_profile: null
                    })
        }else {
            const msg_time = 'Token Not Expired : โทเค็นยังไม่หมดอายุ active code satatus complate'
            const msg_time_th = 'โทเค็นยังไม่หมดอายุ active code satatus complate'
            const msg_time_en = 'Token Not Expired  active code satatus complate'
            const expired_status = 1
            const status = true
            const code = 200

            const data_array: any = {}
            data_array.status = 1
            await AuthModels.updateuid(db1, user_id, data_array)
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
                    reply.send({  // แสดงข้อมูล api
                        title: {
                        status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                        },  
                        data: {
                            error: null, timeconfig: timeconfig,time: timestamp_cul,living_time:time_settings,expired_status: expired_status,
                           // msg_time: msg_time, 
                            user_id: user_id, level: level, username: username,
                           // startdate: startdate, time_expired: time_expired, time_setting: time_setting, issued_at: issued_at, now: now, time_cul: timestamp_cul,
                        },
                        ad_administrator_profile: ad_administrator_profile,
                    })
        }
        console.log('at jwt :'+at) 
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
fastify.get('/verify',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
    /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
    var str  : any =  request.headers.authorization
    var res = str.replace("Bearer ", "")  
    let ids = request.id
    const decoded: any = fastify.jwt.verify(res) 
    const at = decoded['at']
    const startdate = at['startdate']
    const issued_at = at['issued_at']
    const time_setting  : any =  at['time_setting']*100
    const time_expired = at['time_expired']
    const day_expired = at['day_expired']
    const timeconfig = at['timeconfig']
    const state = at['state'] 
    var now = Date.now()
    var time_settings =time_setting
    var timestamp_cul  : any = now - issued_at 
    var timestamp_culs  : any = timestamp_cul
    if (timestamp_culs > time_settings) {
        const msg_time = 'Token Expired : โทเค็นหมดอายุ'
        const msg_time_th = 'โทเค็นหมดอายุ'
        const msg_time_en = 'Token Expired '
        const expired_status = 0
        const status = false
        const code = 500
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false) 
                reply.send({  // แสดงข้อมูล api
                    title: {
                    status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                    },  
                    data: null
                })
    }else {
        const msg_time = 'Token Not Expired : โทเค็นยังไม่หมดอายุ'
        const msg_time_th = 'โทเค็นยังไม่หมดอายุ'
        const msg_time_en = 'Token Not Expired '
        const expired_status = 1
        const status = true 
        const code = 200
            reply.header('Access-Control-Allow-Methods', 'POST')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true)  
            reply.header('x-bar', 'bar')   
                reply.send({  // แสดงข้อมูล api
                    title: {
                    status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                    },  
                    data: decoded,
                })
    }
    /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
       
})
/**************************************************/
fastify.post('/verify',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
     /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
     var str  : any =  request.headers.authorization
     var res = str.replace("Bearer ", "")  
     let ids = request.id
     const decoded: any = fastify.jwt.verify(res) 
     const at = decoded['at']
     const startdate = at['startdate']
     const issued_at = at['issued_at']
     const time_setting  : any =  at['time_setting']*100
     const time_expired = at['time_expired']
     const day_expired = at['day_expired']
     const timeconfig = at['timeconfig']
     const state = at['state'] 
     var now = Date.now()
     var time_settings =time_setting
     var timestamp_cul  : any = now - issued_at 
     var timestamp_culs  : any = timestamp_cul
     if (timestamp_culs > time_settings) {
         const msg_time = 'Token Expired : โทเค็นหมดอายุ'
         const msg_time_th = 'โทเค็นหมดอายุ'
         const msg_time_en = 'Token Expired '
         const expired_status = 0
         const status = false
         const code = 500
         reply.header('Access-Control-Allow-Methods', 'GET')
         reply.header('message', 'Information Correct')
         reply.header('statusCode', 500)
         reply.header('status', false) 
                 reply.send({  // แสดงข้อมูล api
                     title: {
                     status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                     },  
                     data: null
                 })
     }else {
         const msg_time = 'Token Not Expired : โทเค็นยังไม่หมดอายุ'
         const msg_time_th = 'โทเค็นยังไม่หมดอายุ'
         const msg_time_en = 'Token Not Expired '
         const expired_status = 1
         const status = true 
         const code = 200
             reply.header('Access-Control-Allow-Methods', 'POST')
             reply.header('message', 'Information Correct')
             reply.header('statusCode', 200)
             reply.header('status', true)  
             reply.header('x-bar', 'bar')   
                 reply.send({  // แสดงข้อมูล api
                     title: {
                     status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                     },  
                     data: decoded,
                 })
     }
     /******************************ตรวจสอบวันหมดอายุ Token check*************************************/
        
})
/**************************************************/      
/*ป้องกัน การใช้งาน โดย Token */
fastify.post('/verifyauthen',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
            var str  : any =  request.headers.authorization
            var res = str.replace("Bearer ", "")  
            const decoded: any = fastify.jwt.verify(res) 
            const at = decoded['at']
            const startdate = at['startdate']
            const issued_at = at['issued_at']
            const time_setting  : any =  at['time_setting']*100
            const time_expired = at['time_expired']
            const day_expired = at['day_expired']
            const timeconfig = at['timeconfig']
            const state = at['state'] 
            var now = Date.now()
            var time_settings =time_setting
            var timestamp_cul  : any = now - issued_at 
            var timestamp_culs  : any = timestamp_cul
            if (timestamp_culs > time_settings) {
                const msg_time = 'Token Expired : โทเค็นหมดอายุ'
                const msg_time_th = 'โทเค็นหมดอายุ'
                const msg_time_en = 'Token Expired '
                const expired_status = 0
                const status = false
                const code = 500
                reply.header('Access-Control-Allow-Methods', 'GET')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', false) 
                        reply.send({  // แสดงข้อมูล api
                            title: {
                            status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                            },  
                            data: null
                        })
                        return
            }
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.code(200).send({ // แสดงข้อมูล api
                title: {
                    status: true, statusCode : 200,
                    message: 'Authentication successful',
                    message_th: 'test สำเร็จ',
                    cache: 'no cache'
                    },  
                    data: decoded
            }) 
            return
})
fastify.get('/authentication',async (request: FastifyRequest, reply: FastifyReply) => {
    //var str  : any =  request.headers.authorization
    //var res = str.replace("Bearer ", "")  
    const body: any = request.body
    const token = body.token 
    if (token == '') {
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false) 
        reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'token is null',message_th: 'ไม่พบข้อมูล token' })
        console.log(request.body)
        return //  exit loop ออกจากลูปการทำงาน 
    }
    const decoded: any = fastify.jwt.verify(token) 
    const at = decoded['at']
    const startdate = at['startdate']
    const issued_at = at['issued_at']
    const time_setting  : any =  at['time_setting']*100
    const time_expired = at['time_expired']
    const day_expired = at['day_expired']
    const timeconfig = at['timeconfig']
    const state = at['state'] 
    var now = Date.now()
    var time_settings =time_setting
    var timestamp_cul  : any = now - issued_at 
    var timestamp_culs  : any = timestamp_cul
    if (timestamp_culs > time_settings) {
        const msg_time = 'Token Expired : โทเค็นหมดอายุ'
        const msg_time_th = 'โทเค็นหมดอายุ'
        const msg_time_en = 'Token Expired '
        const expired_status = 0
        const status = false
        const code = 500
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false) 
                reply.send({  // แสดงข้อมูล api
                    title: {
                    status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                    },  
                    data: null
                })
                return
    }
    reply.header('Access-Control-Allow-Methods', 'GET')
    reply.header('message', 'Information Correct')
    reply.header('statusCode', 200)
    reply.header('status', true) 
    reply.code(200).send({ // แสดงข้อมูล api
        title: {
            status: true, statusCode : 200,
            message: 'Authentication successful',
            message_th: 'Authentication สำเร็จ',
            cache: 'no cache'
            },  
            data: decoded
    }) 
    return
})
/**************************************************/
fastify.post('/authentication', async (request: FastifyRequest, reply: FastifyReply) => {
    var option: any = 0
    const body: any = request.body
    const token = body.token 
    var option = body.option  
    if (option == 1) {
        var str: any = request.headers.authorization
        var res = str.replace("Bearer ", "")
        const rescode: any = fastify.jwt.verify(res)
        /**************************************************/
        const at = rescode['at']
        const startdate = at['startdate']
        const issued_at = at['issued_at']
        const time_setting  : any =  at['time_setting']*100
        const time_expired = at['time_expired']
        const day_expired = at['day_expired']
        const timeconfig = at['timeconfig']
        const state = at['state'] 
        var now = Date.now()
        var time_settings =time_setting
        var timestamp_cul  : any = now - issued_at 
        var timestamp_culs  : any = timestamp_cul
        if (timestamp_culs > time_settings) {
            const msg_time = 'Token Expired : โทเค็นหมดอายุ'
            const msg_time_th = 'โทเค็นหมดอายุ'
            const msg_time_en = 'Token Expired '
            const expired_status = 0
            const status = false
            const code = 500
            reply.header('Access-Control-Allow-Methods', 'GET')
            reply.header('message', 'Information Correct')
            reply.header('statusCode', 500)
            reply.header('status', false) 
                    reply.send({  // แสดงข้อมูล api
                        title: {  status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache',type: 'Bearer header'},  
                        data: null
                    })
                    return
        }
        /**************************************************/
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Bearer Information Correct')
        reply.header('statusCode', 200)
        reply.header('status', true)
        const msg_time_th2 = 'โทเค็น ยังไม่หมดอายุ'
        const msg_time_en2 = 'Token Not Expired '
        reply.code(500).send({
            title: { status: true, statusCode: 200,message: 'verify token done',  message_th: 'ถอดรหัสข้อมูล โทเค็น สำเร็จ', msg_time_en: msg_time_en2,msg_time_th: msg_time_th2,type: 'Bearer header'},
            data: rescode,
        })
        console.log(rescode)
        return //  exit loop ออกจากลูปการทำงาน 
    }
    if (token == '') {
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false) 
        reply.code(500).send({ title: {status: false, statusCode : 500,},message: 'token is null',message_th: 'ไม่พบข้อมูล token' })
        console.log(request.body)
        return //  exit loop ออกจากลูปการทำงาน 
    }
    const decoded: any = fastify.jwt.verify(token) 
    const at = decoded['at']
    const startdate = at['startdate']
    const issued_at = at['issued_at']
    const time_setting  : any =  at['time_setting']*100
    const time_expired = at['time_expired']
    const day_expired = at['day_expired']
    const timeconfig = at['timeconfig']
    const state = at['state'] 
    var now = Date.now()
    var time_settings =time_setting
    var timestamp_cul  : any = now - issued_at 
    var timestamp_culs  : any = timestamp_cul
    if (timestamp_culs > time_settings) {
        const msg_time = 'Token Expired : โทเค็นหมดอายุ'
        const msg_time_th = 'โทเค็นหมดอายุ'
        const msg_time_en = 'Token Expired '
        const expired_status = 0
        const status = false
        const code = 500
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false) 
                reply.send({  // แสดงข้อมูล api
                    title: {
                    status: status,statusCode : code, message: msg_time_en,msg_time_th: msg_time_th,cache:'no cache'
                    },  
                    data: null
                })
                return
    }

    const msg_time_th2 = 'โทเค็น ยังไม่หมดอายุ'
    const msg_time_en2 = 'Token Not Expired '
    reply.header('Access-Control-Allow-Methods', 'GET')
    reply.header('message', 'Information Correct')
    reply.header('statusCode', 200)
    reply.header('status', true) 
    reply.code(200).send({ // แสดงข้อมูล api
        title: {
            status: true, statusCode : 200,
            type: 'post',
            message: 'Authentication successful',
            message_th: 'Authentication สำเร็จ',
            cache: 'no cache', msg_time_en2: msg_time_en2,msg_time_th2: msg_time_th2
            },  
            data: decoded
    }) 
    return
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
          reply.header('code', 200)
          reply.code(200).send({
                  status: true,
                  statusCode: 200,
                  statusrun: 1,
                  cache: 'no cache',
                  nameservice: 'Micro service 1',
                  message: 'The system works in normal mode.',
                  message_th: 'ระบบทำงาน ในโหมดปกติ',
                })
        } else {
          reply.header('status', false) 
          reply.header('statusCode', 500)
          reply.header('code', 500)
          reply.code(500).send({
                status: false,
                statusCode: 500,
                statusrun: 0,
                cache: 'no cache',
                nameservice: 'Micro service 1',
                message: 'Maintenance mode , Sorry for the inconvenience',
                message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
              })
        
       }
      /*****************************************************/
      console.log(request.body) 
})
/**************************************************/      
} 