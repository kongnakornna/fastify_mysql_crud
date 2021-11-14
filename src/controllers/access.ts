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
const util = require('util')
import singinSchema from '../modules/auth/schemas/singinSchema' 
/************* validate schemas*******************/
import changepasswordSchema from '../modules/auth/schemas/changepasswordSchema' 
import changeemailSchema from '../modules/auth/schemas/changeemailSchema' 
/*************typeorm start******************************/
import { getManager, getRepository, getCustomRepository } from 'typeorm'
import { Sd_users } from '../entities/Sd_users.entities'
import { SduserRepository } from '../repositories/Sduser.repository';
/*************typeorm end*******************************/
export default async function access(fastify: FastifyInstance) {
/**************************************************/  
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
fastify.post('/test',{ schema:singinSchema}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const body: any = request.body 
    const username = body.username
    const password = body.password
    console.log(body) 
  /*************typeorm end*******************************/
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
      }if (password == '') {
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
      // console.log('password '+password)
      // console.log('chkPassword '+chkPassword) 
      const password2: any = chkPassword
      // QueryBuilder start
      const status: number = Number(1)  
      const respository = getCustomRepository(SduserRepository);
      const result = await respository.finduser(username,chkPassword);
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
        const expiration_time=issued_at+time_setting 
        const token = fastify.jwt.sign({
            profile:datars,
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
    
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 200)
        reply.header('status', true) 
        reply.send({
            title: { status: true, statusCode : 200,cache: 'no cache' },
            message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
            message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
            // data: datars,
            // encoded: token,
            TIMEEXPIRE: env.TIMEEXPIRE,
            token
        })
        return // exit loop ออกจากลูปการทำงาน 
      } else {
        reply.code(400).send({
            title: { status: false, statusCode : 400,cache: 'no cache' },
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
fastify.post('/singin', { schema:singinSchema}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const body: any = request.body 
    const username = body.username
    const password = body.password
    console.log(body) 
  /*************typeorm end*******************************/
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
      }if (password == '') {
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
      // console.log('password '+password)
      // console.log('chkPassword '+chkPassword) 
      const password2: any = chkPassword
      // QueryBuilder start
      const status: number = Number(1)  
      const respository = getCustomRepository(SduserRepository);
      const result = await respository.finduser(username,chkPassword);
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
        const expiration_time=issued_at+time_setting 
        const token = fastify.jwt.sign({
            profile:datars,
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
    
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 200)
        reply.header('status', true) 
        reply.send({
            title: { status: true, statusCode : 200,cache: 'no cache' },
            message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
            message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
            // data: datars,
            // encoded: token,
            TIMEEXPIRE: env.TIMEEXPIRE,
            token
        })
        return // exit loop ออกจากลูปการทำงาน 
      } else {
        reply.code(400).send({
            title: { status: false, statusCode : 400,cache: 'no cache' },
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
fastify.post('/login', { schema:singinSchema}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const body: any = request.body 
    const username = body.username
    const password = body.password
    console.log(body) 
  /*************typeorm end*******************************/
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
      }if (password == '') {
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
      
      const status :any= 1
      const encPassword = crypto.createHash('md5').update(password).digest('hex')
      const chkPassword: any = encPassword
      // console.log('password '+password)
      // console.log('chkPassword '+chkPassword) 
      const password2: any = chkPassword
      // QueryBuilder start
      const data = await getRepository(Sd_users)
                            .createQueryBuilder("Sd_users")
                            .select("SUM(Sd_users.user_id)", "sum") 
                            .select([
                              "Sd_users.profile_id",
                              "Sd_users.user_id AS Sd_users_uid",
                              "Sd_users.user_id", 
                              "Sd_users.username",
                              "Sd_users.email",
                              "Sd_users.firstname",
                              "Sd_users.lastname",
                              "Sd_users.fullname",
                              "Sd_users.level",
                            ])
                            .where("Sd_users.username = :username", { username })
                            .andWhere("Sd_users.password = :password", { password: password2 })
                            .andWhere("Sd_users.status = :status", { status })
                            .getMany()
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
        const expiration_time=issued_at+time_setting 
        const token = fastify.jwt.sign({
            profile:datars,
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
    
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 200)
        reply.header('status', true) 
        reply.send({
            title: { status: true, statusCode : 200,cache: 'no cache' },
            message: 'welcome ' + user.firstname + ' ' + user.lastname + ' Sign in system successfully',
            message_th: 'ยินดีต้อนรับ คุณ ' + user.firstname + ' ' + user.lastname + ' เข้าสู่ระบบสำเร็จ',
            // data: datars,
            // encoded: token,
            TIMEEXPIRE: env.TIMEEXPIRE,
            token
        })
        return // exit loop ออกจากลูปการทำงาน 
      } else {
        reply.code(400).send({
            title: { status: false, statusCode : 400,cache: 'no cache' },
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
fastify.post('/authentication',async (request: FastifyRequest, reply: FastifyReply) => {
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
            data: decoded['profile']
    }) 
    return
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
}