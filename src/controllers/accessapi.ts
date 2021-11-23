import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as knex from 'knex'
import * as crypto from 'crypto'
import * as Md5 from "md5-typescript";
/************* nodemailer*******************/ 
import * as path from 'path'
const envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const mode = env.mode
/************* log config *******************/
const util = require('util')
import singinSchema from '../schemas/bodysingin' 
import generatetokenSchema from '../schemas/generatetokenSchema' 
/************* validate schema *******************/
import changepasswordSchema from '../modules/auth/schemas/changepasswordSchema' 
import changeemailSchema from '../modules/auth/schemas/changeemailSchema' 
import accesstokenSchema from '../schemas/accesstokenSchema' 
import headerallow from '../schemas/headerallow' 
import headerallowkey from '../schemas/headerallowkey' 
import headerallowtree from '../schemas/headerallowtree' 
import bodygetuser_id from '../schemas/bodygetuser_id' 
import requesttoken from '../schemas/requesttoken' 
/*************typeorm start config******************************/
import { getManager, getRepository, getCustomRepository } from 'typeorm' //  connection typeorm
import { Sd_usersRepository } from '../repositories/Sd_users.repository'; //  query builder typeorm
/*************typeorm end config*******************************/
export default async function accessapi(fastify: FastifyInstance) {
/**************************************************/
function Randomtoken(length: any) {
        var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
}
fastify.get('/genint',{preValidation: [fastify.genint]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/genint',{preValidation: [fastify.genint]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/getstate',{preValidation: [fastify.getstate]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/getstate',{preValidation: [fastify.getstate]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/clientsecret',{preValidation: [fastify.clientsecret]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/clientsecret',{preValidation: [fastify.clientsecret]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.get('/codegenclientid',{preValidation: [fastify.codegen]}, async (request: FastifyRequest, reply: FastifyReply) => {}) 
fastify.post('/codegenclientid',{preValidation: [fastify.codegen]}, async (request: FastifyRequest, reply: FastifyReply) => {})   
fastify.post('/gentoken', async (request: FastifyRequest, reply: FastifyReply) => {
    const test: any = getRandomString(19);
    const Randomkey: any = Randomtoken(35);
    const token = fastify.jwt.sign({accesskey: Randomkey})
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
                 // accesskey : Randomkey, 
                  },token })
})
fastify.post('/accesstoken', { schema: headerallowtree }, async (request: FastifyRequest, reply: FastifyReply) => {
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
    const host: any = headers.host   
    var client_id: any = headers.client_id  
    var secret_key: any = headers.secret_key  
    var access_token_key: any = headers.access_token_key  
    var dubug: any =  headers.dubug
    var timeset : any = '1d' // 60, "2 days", "10h", "7d".
    var time : any = body.time
    // var expire_in : any = time || timeset
    var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
    // access token
    /*************************/
    if (dubug == 0) {
        reply.code(500).send({
                          headers: headers,
                          client_id: client_id,
                          client_id_conf: client_id_conf,
                          secret_key: secret_key,
                          secret_key_conf: secret_key_conf,
                          access_token_key: access_token_key,
                          access_token_key_conf: access_token_key_conf,
                          timeset: timeset,
                          time: time,
                          TIMEEXPIRE_TOKEN: TIMEEXPIRE_TOKEN, 
                          expire_in: expire_in,
                        })
                    return 
      }
    try {
        if (client_id === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message', 'forbidden access')
            reply.code(500).send({ message: 'client_id is empty ,forbidden access ', message_th: 'ไม่พบ client_id ไม่อนุญาตให้เข้าถึง ระบบ' })
            return
        }
        if (client_id === client_id_conf) { } else {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({
                message: 'client_id is incorrect ,forbidden access ',
                message_th: 'client_id ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง',
                client_id: client_id,client_id_conf: client_id_conf,
            })
          return  
        }
        if (secret_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
          return  
        }
        if (secret_key === secret_key_conf) { } else {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is incorrect ,forbidden access ', message_th: 'secret_key ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง'})
          return  
        }
        if (access_token_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
          return  
        }
        if (access_token_key === access_token_key_conf) { } else {
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
            timeset: timeset,
            }) 
        /********************************/
    }catch (error) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message', error)  
            reply.code(500).send({ resporn: 'forbidden access', message: error})
          return  
        }
})  
fastify.post('/code', { schema: headerallowkey}, async (request: FastifyRequest, reply: FastifyReply) => {
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
    const host: any = headers.host   
    var client_id: any = headers.client_id  
    var access_token_key: any = headers.access_token_key  
    var dubug: any =  headers.dubug
    var timeset : any = '1d' // 60, "2 days", "10h", "7d".
    var time : any = body.time
    // var expire_in : any = time || timeset
    var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
    // access token
    /*************************/
    if (dubug == 0) {
        reply.code(500).send({
                          headers: headers,
                          client_id: client_id,
                          client_id_conf: client_id_conf,
                          secret_key_conf: secret_key_conf,
                          access_token_key: access_token_key,
                          access_token_key_conf: access_token_key_conf,
                          timeset: timeset,
                          time: time,
                          TIMEEXPIRE_TOKEN: TIMEEXPIRE_TOKEN, 
                          expire_in: expire_in,
                        })
                    return 
      }
    try {
        if (client_id === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message', 'forbidden access')
            reply.code(500).send({ message: 'client_id is empty ,forbidden access ', message_th: 'ไม่พบ client_id ไม่อนุญาตให้เข้าถึง ระบบ' })
            return
        }
        if (client_id === client_id_conf) { } else {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({
                message: 'client_id is incorrect ,forbidden access ',
                message_th: 'client_id ไม่ถูกต้อง ไม่อนุญาตให้เข้าถึง',
                client_id: client_id,client_id_conf: client_id_conf,
            })
          return  
        }
        if (access_token_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
          return  
        }
        if (access_token_key === access_token_key_conf) { } else {
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
            timeset: timeset,
            }) 
        /********************************/
    }catch (error) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message', error)  
            reply.code(500).send({ resporn: 'forbidden access', message: error})
          return  
        }
})  
fastify.post('/requesttoken', { schema: requesttoken}, async (request: FastifyRequest, reply: FastifyReply) => {
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
    const host: any = headers.host   
    var client_id: any = headers.client_id  
    var access_token_key: any = headers.access_token_key  
    var dubug: any =  headers.dubug
    var timeset : any = '1d' // 60, "2 days", "10h", "7d".
    var time : any = body.time
    // var expire_in : any = time || timeset
    var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
    // access token
    /*************************/
    if (dubug == 0) {
        reply.code(500).send({
                          headers: headers,
                          client_id: client_id,
                          client_id_conf: client_id_conf,
                          secret_key_conf: secret_key_conf,
                          access_token_key: access_token_key,
                          access_token_key_conf: access_token_key_conf,
                          timeset: timeset,
                          time: time,
                          TIMEEXPIRE_TOKEN: TIMEEXPIRE_TOKEN, 
                          expire_in: expire_in,
                        })
                    return 
      }
    try {
        if (access_token_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
          return  
        }
        if (access_token_key === access_token_key_conf) { } else {
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
            timeset: timeset,
            }) 
        /********************************/
    }catch (error) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message', error)  
            reply.code(500).send({ resporn: 'forbidden access', message: error})
          return  
        }
})  
fastify.post('/singin', { schema:singinSchema}, async (request: FastifyRequest, reply: FastifyReply) => {
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
        const host: any = headers.host   
        //var client_id: any = headers.client_id  
        //var access_token_key: any = headers.access_token_key  
        var secret_key: any = headers.secret_key  
        var dubug: any =  headers.dubug
        var timeset : any = '1d' // 60, "2 days", "10h", "7d".
        var time : any = body.time
        // var expire_in : any = time || timeset
        var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
        // access token
        /*************************/ 
        var ma : any =env.mode // 0= ma
        const username = body.username
        const password = body.password
        console.log(body) 
        /*************typeorm end*******************************/
      try { 
        if (secret_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
            return  
        }
          if (secret_key === secret_key_conf) { }else{
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
        const status1 :any= 1
        const encPassword = crypto.createHash('md5').update(password).digest('hex')
        const chkPassword: any = encPassword
        console.log('password '+password)
        console.log('chkPassword '+chkPassword) 
        const password2: any = chkPassword
        // QueryBuilder start
        const status: number = Number(1)  
        const respository = getCustomRepository(Sd_usersRepository);
        const result = await respository.singin_by_user(username,chkPassword);
        const data =  result
        // get QueryBuilder end
        console.log("typeorm is QueryBuilder : ",util.inspect( ' data : '+data, { showHidden: true, depth: true, colors: true }))
        const rs: any = data  
        const user: any = rs[0]
        const user_idx = user.user_id
        const datars = {
                idx:  user_idx,
                username: user.username, 
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                level: user.level,
                profile_id: user.profile_id,
        }
        const countdata: any = rs.length  
        if (countdata>=1) {
          // reply
          /*
          reply.header('status', true)
          reply.header('statusCode', 200)
          reply.code(200).send({code: 200,status: true,data: user,count: countdata})
          return  // exit loop ออกจากลูปการทำงาน 
          */
          const user: any = data  
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
          const expiration_time = issued_at + time_setting 
          /********************************/
          const users: any = user[0]
          console.log(users)
          var token = fastify.jwt.sign({
                    user_idx: users.user_id,profile_id: users.profile_id,level: users.level,
                    username: users.username,email: users.email,
                    firstName: users.firstname,lastName: users.lastname,
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
      const user_idx = users.user_id
      const datars = {
              uid:  user_idx,
              username: users.username, 
              email: users.email,
              firstName: users.firstname,
              lastName: users.lastname,
              level: users.level,
          }
          const MaxAge = 84000
          const set_cookie:any='token='+token+'; Max-Age='+MaxAge+'; SameSite=None; Secure'; 
          reply.header('Set-Cookie','visited=true; Max-Age='+MaxAge+'; HttpOnly, Secure');
          reply.header('Set-Cookie', set_cookie)
          reply.header('Access-Control-Allow-Methods', 'GET')
          reply.header('message', 'Information Correct')
          reply.header('statusCode', 200)
          reply.header('status', true) 
          reply.send({
              status: true, statusCode : 200,cache: 'no cache',
              message: 'welcome ' + users.firstname + ' ' + users.lastname + ' Sign in system successfully',
              message_th: 'ยินดีต้อนรับ คุณ ' + users.firstname + ' ' + users.lastname + ' เข้าสู่ระบบสำเร็จ',
              // data: users, encoded: token,
              TIMEEXPIRE: env.TIMEEXPIRE,
              token
          })
          return // exit loop ออกจากลูปการทำงาน 
        } else {
          reply.code(400).send({
               status: false, statusCode : 400,cache: 'no cache' ,
              message: 'information username '+ username +' not found in the system! or incorrect information', message_th: 'ไม่พบข้อมูล username '+ username +' ในระบบ หรือ ข้อมูลไม่ถูกต้อง',count: countdata
          })
          return  // exit loop ออกจากลูปการทำงาน 
        }
      } catch (error) { 
          console.log(error)
          reply.header('status', false)
          reply.header('statusCode', 500)
          reply.code(500).send({ code: 500,status: false, error: error,message: 'error data not found in the system!',message_th: ' ไม่พบข้อมูล หรือ ระบบทำงานล้มเหลว',data: null, })
          return
      }
})   
/*****************************************************/ 
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
function getRandomString(length: any) {
  var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result: any =  ''
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
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
/**************************************************/    
fastify.post('/authentication',async (request: FastifyRequest, reply: FastifyReply) => {
    const headers: any = request.headers // header
    const body: any = request.body // post 
    const query: any = request.query // ?xx=1 
    const str: any = request.headers.authorization  // token in Bearer  header
    const token: any = str.replace("Bearer ", "")  
    const token_bearer: any = fastify.jwt.verify(token) 
    const jwtdata: any = {}
    
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
    jwtdata.expire_in = expire_in_time 
    jwtdata.info = token_bearer 
    //jwtdata.token= token 
    /*****************************************************/
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no 
    reply.header('statusCode',200) 
    reply.code(200).send({
        status: true,
        statusCode: 200,  
        message: 'jwt verify',
        message_th: 'ถอดรหัส jwt',
        data: jwtdata,
        // token: token, str: str, headers: headers, body: body,query: query,
        }) 
})
fastify.post('/refreshtoken',async (request: FastifyRequest, reply: FastifyReply) => {
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
        const str: any = request.headers.authorization  // token in Bearer  header
        const host: any = headers.host   
        //var client_id: any = headers.client_id  
        //var access_token_key: any = headers.access_token_key  
        var secret_key: any = headers.secret_key  
        var dubug: any =  headers.dubug
        var timeset : any = '10d' // 60, "2 days", "10h", "7d".
        var time : any =null
        // var expire_in : any = time || timeset
        var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
        // access token
        /*************************/ 
        const token: any = str.replace("Bearer ", "")  
        const token_bearer: any = fastify.jwt.verify(token) 
        const jwtdata: any = {}
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
        jwtdata.expire_in = expire_in_time 
        jwtdata.info = token_bearer 
        /*************typeorm end*******************************/
        try {
             /********************************/
             let token = fastify.jwt.sign({token_bearer,expirein: expire_in },{ expiresIn: expire_in})
             let decoded = fastify.jwt.decode(token)
             const jwtdata: any = {}
             jwtdata.token = token
             jwtdata.decoded = decoded  
             jwtdata.expirein = expire_in
             reply.header('version', 1)
             reply.header('x-cache-status', 0) // 1=yes ,0=no 
             reply.header('statusCode',200) 
             reply.code(200).send({
                 title: { status: true, statusCode: 200},  
                 message: 'refresh token successful',
                 message_th: 'refresh token ',
                 token:token,
                 decoded:decoded,
                 timeset: timeset,
                 }) 
             /********************************/
        }catch (error) {
                reply.header('accesstoken', '')
                reply.header('statusCode', 500)
                reply.header('status', false)
                reply.header('message', error)  
                reply.code(500).send({ resporn: 'forbidden access', message: error})
              return  
        }
})
/*****************************************************/ 
fastify.post('/privateallow', { preValidation: [fastify.authenticate],schema: bodygetuser_id },async (request: FastifyRequest, reply: FastifyReply) => {
    reply.header('version', 1)
    reply.header('x-cache-status', 0) // 1=yes ,0=no
    reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    reply.header('Expires', '-1')
    reply.header('Pragma', 'no-cache')  
    reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    reply.header('message', 'Working')
    try {
          reply.header('statusCode', 200)
          reply.header('status', true) 
          reply.code(200).send({
              title: {
                  message: "Allow Protected area!  allow access to the system",
                  message_th: "Protected area อนุญาตให้เข้าถึงระบบ!",
                        status: true,
                        status_int: 1,
                        statusCode : 200, 
                    }, 
                body: { data: null,  }, 
          })
        return
    } catch (error) { 
        console.log(error)
        reply.header('status', false)
        reply.header('statusCode', 500)
        reply.code(500).send({
              code: 500, status: false, error: error,
              message: 'error data not found in the system!',
              message_th: ' ไม่พบข้อมูล หรือ ระบบทำงานล้มเหลว',
              data: null,
            })
        return
    }
})
fastify.post('/singout',async (request: FastifyRequest, reply: FastifyReply) => {
  const headers: any = request.headers // header
  const body: any = request.body // post 
  const query: any = request.query // ?xx=1 
  const str: any = request.headers.authorization  // token in Bearer  header
  const token: any = str.replace("Bearer ", "")  
  const token_bearer: any = fastify.jwt.verify(token) 
  const jwtdata: any = {}
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
  jwtdata.expire_in = expire_in_time 
  jwtdata.info = token_bearer 
  //jwtdata.token= token 
  /*****************************************************/
  reply.header('version', 1)
  reply.header('x-cache-status', 0) // 1=yes ,0=no 
  reply.header('statusCode', 200) 
  // const destroy_token: any = fastify.jwt.destroy(token) 
  const destroy_token = fastify.jwt.decode(token)
  reply.code(200).send({
      status: true,
      statusCode: 200,  
      message: 'singout token successful',
      message_th: 'singout token successful',
      data: jwtdata,
      destroy: destroy_token,
      // token: token, str: str, headers: headers, body: body,query: query,
      }) 
})
fastify.post('/singincookiesession', { schema:singinSchema}, async (request: FastifyRequest, reply: FastifyReply) => {
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
        const host: any = headers.host   
        //var client_id: any = headers.client_id  
        //var access_token_key: any = headers.access_token_key  
        var secret_key: any = headers.secret_key  
        var dubug: any =  headers.dubug
        var timeset : any = '1d' // 60, "2 days", "10h", "7d".
        var time : any = body.time
        // var expire_in : any = time || timeset
        var expire_in : any = time || TIMEEXPIRE_TOKEN || timeset
        // access token
        /*************************/ 
        var ma : any =env.mode // 0= ma
        const username = body.username
        const password = body.password
        console.log(body) 
        /*************typeorm end*******************************/
    try { 
        if (secret_key === null) {
            reply.header('accesstoken', '')
            reply.header('statusCode', 500)
            reply.header('status', false)
            reply.header('message','forbidden access')  
            reply.code(500).send({ message: 'secret_key is empty ,forbidden access ', message_th: 'ไม่พบ secret_key ไม่อนุญาตให้เข้าถึง ระบบ'})
            return  
        }
          if (secret_key === secret_key_conf) { }else{
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
        const status1 :any= 1
        const encPassword = crypto.createHash('md5').update(password).digest('hex')
        const chkPassword: any = encPassword
        console.log('password '+password)
        console.log('chkPassword '+chkPassword) 
        const password2: any = chkPassword
        // QueryBuilder start
        const status: number = Number(1)  
        const respository = getCustomRepository(Sd_usersRepository);
        const result = await respository.singin_by_user(username,chkPassword);
        const data =  result
        // get QueryBuilder end
        console.log("typeorm is QueryBuilder : ",util.inspect( ' data : '+data, { showHidden: true, depth: true, colors: true }))
        const rs: any = data  
        const user: any = rs[0]
        const user_idx = user.user_id
        const datars = {
                idx:  user_idx,
                username: user.username, 
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                level: user.level,
                profile_id: user.profile_id,
        }
        const countdata: any = rs.length  
        if (countdata>=1) {
          // reply
          /*
          reply.header('status', true)
          reply.header('statusCode', 200)
          reply.code(200).send({code: 200,status: true,data: user,count: countdata})
          return  // exit loop ออกจากลูปการทำงาน 
          */
          const user: any = data  
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
          const expiration_time = issued_at + time_setting 
          /********************************/
          const users: any = user[0]
          console.log(users)
          var token = fastify.jwt.sign({
                    user_idx: users.user_id,profile_id: users.profile_id,level: users.level,
                    username: users.username,email: users.email,
                    firstName: users.firstname,lastName: users.lastname,
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
          const user_idx = users.user_id
          const datars = {
                  uid:  user_idx,
                  username: users.username, 
                  email: users.email,
                  firstName: users.firstname,
                  lastName: users.lastname,
                  level: users.level,
          }

         
          const MaxAge = 3600
          const set_cookie:any='uid='+user_idx+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
          reply.header('Set-Cookie', set_cookie)
          const set_cookie2: any = 'token=' + token + '; Max-Age=' + MaxAge + '; SameSite=None; Secure';
          
          reply.header('Access-Control-Allow-Methods', 'GET')
          reply.header('message', 'Information Correct')
          reply.header('statusCode', 200)
          reply.header('status', true) 
          reply.send({
              status: true, statusCode : 200,cache: 'no cache',
              message: 'welcome ' + users.firstname + ' ' + users.lastname + ' Sign in system successfully',
              message_th: 'ยินดีต้อนรับ คุณ ' + users.firstname + ' ' + users.lastname + ' เข้าสู่ระบบสำเร็จ',
              // data: users, encoded: token,
              TIMEEXPIRE: env.TIMEEXPIRE,
              token
          })
          return // exit loop ออกจากลูปการทำงาน 
        } else {
          reply.code(400).send({
               status: false, statusCode : 400,cache: 'no cache' ,
              message: 'information username '+ username +' not found in the system! or incorrect information', message_th: 'ไม่พบข้อมูล username '+ username +' ในระบบ หรือ ข้อมูลไม่ถูกต้อง',count: countdata
          })
          return  // exit loop ออกจากลูปการทำงาน 
        }
    } catch (error) { 
          console.log(error)
          reply.header('status', false)
          reply.header('statusCode', 500)
          reply.code(500).send({ code: 500,status: false, error: error,message: 'error data not found in the system!',message_th: ' ไม่พบข้อมูล หรือ ระบบทำงานล้มเหลว',data: null, })
          return
    }
})  
/**************************************************/       
}

/*

const token = fastify.jwt.sign({ foo: 'bar' })
const decoded = fastify.jwt.decode(token)
const decoded = fastify.jwt.verify(token)
const globalOptions = fastify.jwt.options


1) Install jwt-redis from npm

2) To Create -

var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

jwtr.sign(payload, secret)
    .then((token)=>{
            // your code
    })
    .catch((error)=>{
            // error handling
    });
3) To verify -

jwtr.verify(token, secret);
4) To Destroy -

jwtr.destroy(token)


# Scope var let const ใช้งานยังไง ?
- `var`  สามารถ `Assign` ค่าใหม่ได้
- `let` สามารถ `Assign` ค่าใหม่ได้
- `const` จะไม่สามารถถูก `assign` ค่าให้กับตัวแปรใหม่ได้
# แนะนำให้ประกาศตัวแปรด้วย const เสมอและค่อยเปลี่ยนเป็น let ถ้าคุณต้องการเปลี่ยนแปลงค่า (mutate) หรือ assign ค่าให้ตัวแปรในภายหลัง

# Var ใช้งานยังไง ?
- ตัวเเปรที่ถูกประกาศด้วย `var` จะเป็น `function scope` เมื่อตัวเเปรถูกสร้างภายใน `function` นั้นสามารถเข้าถึงตัวเเปรนั้นได้ `function scoped `
- ที่ถูกสร้างใน `function `จะไม่สามารถถูกเข้าถึงจากภายนอก `function` ได้

# let ใช้งานยังไง ?
- `var` และ `let` จะคล้ายกันแต่ตัวแปรที่ประกาศด้วย `let` จะเป็น
- `Block scoped`
- ไม่สามารถเข้าถึงก่อนที่มันจะถูก `assign` ค่าได้
- ไม่สามารถประกาศตัวแปรซ้ำใน `scope` เดียวกันได้

# const ใช้งานยังไง ?
- การประกาศตัวแปรโดยใช้ `const` จะเหมือนกับ `let` แต่ต่างตรงที่พวกมันจะไม่สามารถ `assign` ค่าซ้ำได้
- สรุปสั้นๆ สำหรับตัวแปรที่ประกาศแบบ `const:`
- `Block Scoped`
- ไม่สามารถเข้าถึงได้ก่อนถูก `assign` ค่า
- ไม่สามารถประกาศซ้ำได้ใน `scope` เดียวกัน
- ไม่สามารถ `assign` ซ้ำได้

*/