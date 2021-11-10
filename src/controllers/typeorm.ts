import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as knex from 'knex'
import * as crypto from 'crypto'
import * as Md5 from "md5-typescript";
 
/************* nodemailer*******************/ 
import * as path from 'path'
const envPath = path.join(__dirname, '../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const mode = env.mode
const util = require('util')
import singinSchema  from '../modules/auth/schemas/singinSchema' 
/*************typeorm start******************************/
import { getManager, getRepository } from 'typeorm'
import { User } from '../entities/User.entities'
import { Sd_users } from '../entities/Sd_users.entities'
/*************typeorm end*******************************/
export default async function typeorm(fastify: FastifyInstance) {
  /**************************************************/
function getRandomString(length: any) {
    var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result: any =  ''
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
} 
fastify.post('/', {}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const entityManager = getManager(); // you can also get it via getConnection().manager
    const user = await entityManager.find(User); /// model sql 
    console.log("user : ", user)
  /*************typeorm end*******************************/
    try {
        reply.header('status', true)
        reply.header('statusCode', 200)
        reply.header('code', 200)
        reply.code(200).send({  
                data: user,
          })
        return
    } catch (error) { 
        console.log(error)
        reply.code(500).send({ status: false, error: error })
        return
    }
})  
/**************************************************/  
fastify.post('/sdusers', {}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const entityManager = getManager(); // you can also get it via getConnection().manager
    const rs = await entityManager.find(Sd_users); /// model sql 
    console.log("rs : ", rs)
  /*************typeorm end*******************************/
    try {
        reply.header('status', true)
        reply.header('statusCode', 200)
        reply.header('code', 200)
        reply.code(200).send({  
                data: rs,
          })
        return
    } catch (error) { 
        console.log(error)
        reply.code(500).send({ status: false, error: error })
        return
    }
})  
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
      const countdata: any = rs.length  
      if (countdata>=1) {
        // reply
        /*
        reply.header('status', true)
        reply.header('statusCode', 200)
        reply.header('code', 200)
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
            user_id: user.user_id,level: user.level,
            username: user.username,email: user.email,
            profile_id: user.profile_id,
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
        reply.header('code', 500)
        reply.code(500).send({ code: 500,status: false, error: error,message: 'error data not found in the system!',message_th: ' ไม่พบข้อมูล หรือ ระบบทำงานล้มเหลว',data: null, })
        return
    }
})  
/**************************************************/  
fastify.post('/sd', {}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const body: any = request.body 
    const username = body.username
    const user_id = body.user_id
    console.log(body) 
  /*************typeorm end*******************************/
    try {
      if (user_id == '') {
        reply.header('Access-Control-Allow-Methods', 'GET')
        reply.header('message', 'Information Correct')
        reply.header('statusCode', 500)
        reply.header('status', false) 
        reply.code(500).send({
            title: { status: false, statusCode : 500, },
            message: 'user_id is null', message_th: 'ไม่พบข้อมูล user_id'
        })
        console.log(request.body)
        return //reply.sent = true // exit loop ออกจากลูปการทำงาน 
      }
      // QueryBuilder
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
                            ])
                            .where("Sd_users.user_id = :user_id", { user_id })
                            //.orWhere("Sd_users.username = :username", { username })
                            .getMany()
      // get QueryBuilder
      console.log("typeorm is QueryBuilder : ",util.inspect( ' data : '+data, { showHidden: true, depth: true, colors: true }))
      const rs: any = data  
      const countdata: any = rs.length  
      if (countdata>=1) {
        // reply
        reply.header('status', true)
        reply.header('statusCode', 200)
        reply.header('code', 200)
        reply.code(200).send({code: 200,status: true,data: rs,count: countdata})
        return  // exit loop ออกจากลูปการทำงาน 

      } else {
        reply.code(400).send({
            title: { status: false, statusCode : 400,cache: 'no cache' },
            message: 'information user_id '+ user_id +' not found in the system! or incorrect information', message_th: 'ไม่พบข้อมูล user_id '+ user_id +' ในระบบ หรือ ข้อมูลไม่ถูกต้อง',count: countdata
        })
        return  // exit loop ออกจากลูปการทำงาน 
      }

    } catch (error) { 
        console.log(error)
        reply.header('status', false)
        reply.header('statusCode', 500)
        reply.header('code', 500)
        reply.code(500).send({ code: 500,status: false, error: error,message: 'error data not found in the system!',message_th: ' ไม่พบข้อมูล หรือ ระบบทำงานล้มเหลว',data: null, })
        return
    }
})  
/**************************************************/  
}
 
