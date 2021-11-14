import { FastifyRequest, FastifyReply } from 'fastify'
/*********************************/
import fp from 'fastify-plugin'
/*********************************/
import * as knex from 'knex'
import * as crypto from 'crypto'
import * as path from 'path'
const cookie = require('fastify-cookie');
const envPath = path.join(__dirname, '../../../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const redis_host = env.redis_host
const redis_port = env.redis_port
const mode = env.mode
// console.log("mode: ", mode)
/*********************************/
import * as fastify from 'fastify'
const app: fastify.FastifyInstance = fastify.fastify({ logger: { level: 'info'}})
/*********************************/
module.exports = fp(async (fastify: any, opts: any) => {
/*********************************/
fastify.register(require('fastify-jwt'), { secret: opts.secret })
    fastify.decorate('authenapi', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
            return
        } catch (error) {
            reply.send(error)
            return
        }
    })
    /*********************************/
    function getRandomString(length: any) {
        //var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
    }
    function getRandomchar(length: any) { 
        var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
    }
    function getRandomint(length: any) { 
        var randomChars: any =  '0123456789';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
    }
    function getRandomsrtsmall(length: any) { 
        var randomChars: any =  'abcdefghijklmnopqrstuvwxyz';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
    }
    function getRandomsrtbig(length: any) { 
        var randomChars: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result: any =  ''
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
    }
    fastify.decorate('genint', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        const code: any = query_get.code
        /*****************************/
        const genint: any = getRandomint(4)
        /*****************************/ 
        /*****************************/
        try {
            const MaxAge = 60
            const set_cookie:any='code='+genint+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
           // reply.header('Set-Cookie', set_cookie)
            reply.header('version', 1)
            reply.header('x-cache-status', 0) // 1=yes ,0=no
            reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            reply.header('Expires', '-1')
            reply.header('Pragma', 'no-cache')  
            reply.header('state', genint)
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({ genint: genint, message: 'ok'})
            console.log('jwt Verify request :' + request)
            return
        } catch (error) {
                reply.header('genint', '')
                reply.header('statusCode', 200)
                reply.header('status', false)
                reply.header('message', error)  
               reply.send({ genint: '', message: error})
               return  
            }
    })
    fastify.decorate('codegen', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        const code: any = query_get.code
        /*****************************/
        const codenom1: any = getRandomchar(12) 
        const codenom2: any = getRandomchar(10)
        const codenom3: any = getRandomchar(8)
        const codenom4: any = getRandomchar(6)
        const codenom5: any = getRandomsrtbig(5)
        const codenom6: any = getRandomint(5)
        const codegens: any = codenom1+'-'+codenom2+'-'+codenom3+'-'+codenom4+'-'+codenom5+'-'+codenom6
        try {
            const MaxAge = 60
            const set_cookie:any='code='+codegens+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
           // reply.header('Set-Cookie', set_cookie)
            reply.header('version', 1)
            reply.header('x-cache-status', 0) // 1=yes ,0=no
            reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            reply.header('Expires', '-1')
            reply.header('Pragma', 'no-cache')  
            reply.header('code', codegens)
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({ code: codegens, message: 'ok'})
            console.log('jwt Verify request :' + request)
            return
        } catch (error) {
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache')  
                reply.header('code', '')
                reply.header('statusCode', 200)
                reply.header('status', false)
                reply.header('message', error)  
               reply.send({ code: '', message: error})
               return  
            }
    })
    fastify.decorate('getstate', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        const code: any = query_get.code
        /*****************************/
        const state: any =getRandomString(32)
        try {
            const MaxAge = 60
            const set_cookie:any='state='+state+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
           // reply.header('Set-Cookie', set_cookie)
            reply.header('version', 1)
            reply.header('x-cache-status', 0) // 1=yes ,0=no
            reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            reply.header('Expires', '-1')
            reply.header('Pragma', 'no-cache')  
            reply.header('state', state)
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({ state: state, message: 'ok'})
            console.log('jwt Verify request :' + request)
            return
        } catch (error) {
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache')  
                reply.header('state', '')
                reply.header('statusCode', 200)
                reply.header('status', false)
                reply.header('message', error)  
               reply.send({ state: '', message: error})
               return  
            }
    })
    // CLIENT_SECRET
    fastify.decorate('clientsecret', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        const code: any = query_get.code
        /*****************************/
        const clientsecret: any =getRandomString(64)
        try {
            const MaxAge = 60
            const set_cookie:any='clientsecret='+clientsecret+'; Max-Age='+MaxAge+'; SameSite=None; Secure';
           // reply.header('Set-Cookie', set_cookie)
            reply.header('version', 1)
            reply.header('x-cache-status', 0) // 1=yes ,0=no
            reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            reply.header('Expires', '-1')
            reply.header('Pragma', 'no-cache')  
            reply.header('clientsecret', clientsecret)
            reply.header('statusCode', 200)
            reply.header('status', true) 
            reply.send({ clientsecret: clientsecret, message: 'ok'})
            console.log('jwt Verify request :' + request)
            return
        } catch (error) {
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache')  
                reply.header('clientsecret', '')
                reply.header('statusCode', 200)
                reply.header('status', false)
                reply.header('message', error)  
               reply.send({ clientsecret: '', message: error})
               return  
            }
    })
    fastify.decorate('authen', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        try {
            //await request.jwtVerify()
            const jwtVerify: any  = request.jwtVerify()
            await jwtVerify
            reply.header('verify', 'ok')
            console.log('jwt Verify request :'+request)
        } catch (error) {
               reply.header('verify', error)
               reply.send({
                    title: {
                            status: false,
                            statusCode : 500,
                            message: error,
                            message_th: 'ไม่พบข้อมูลโทเค็น หรือ โทเค็นไม่ถูกต้อง', 
                            cache: 'no cache'
                    },
                    data: error 
                })
                return //reply.send(error)
            }
    })
    fastify.decorate('mode', async (request: FastifyRequest, reply: FastifyReply) => {
        var mode: any =  1  // 0= ma
            try {
                if (mode == 1) {
                    reply.header('status', false)
                    reply.header('statusCode', 500)
                    reply.header('code', 500)
                    reply.code(500).send({
                        status: false,
                        statusCode: 500,
                        statusrun: 0,
                        cache: 'no cache',
                        nameservice: 'Micro service tppy-tcas',
                        message: 'Maintenance mode , Sorry for the inconvenience',
                        message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                        error:null,
                    })
                    return
                }
            }catch (error) {
                console.log('jwt error :' + error)
                
                reply.header('version', 1)
                reply.header('x-cache-status', 0) // 1=yes ,0=no
                reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
                reply.header('Expires', '-1')
                reply.header('Pragma', 'no-cache')  
                reply.header('Access-Control-Allow-Methods', 'POST')
                reply.header('message', 'Information Correct')
                reply.header('statusCode', 500)
                reply.header('status', true) 
                reply.code(500).send({
                    statusrun: 0,
                    cache: 'no cache',
                    nameservice: 'Micro service tppy-tcas',
                    message: 'System interrupted , Sorry for the inconvenience',
                    message_th: 'ระบบทำงานขัดข้อง ขออภัยความไม่สะดวก',
                    error:error
                })
                return //reply.sent = true // exit loop  
            }
    })
    /*************** decrypt the information ถอดรหัสข้อมูล ******************/
    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify()
        } catch (error) {
          reply.send(error)
        }
      })
    fastify.decorate('authenticatecheckexpire', async (request: FastifyRequest, reply: FastifyReply) => {
        const headers: any = request.headers // header
        const body: any = request.body // post 
        const query: any = request.query // ?xx=1 
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        /*****************************/
            if (body == null) {
                reply.header('status', false)
                reply.header('statusCode', 500)
                reply.header('code', 500)
                reply.code(500).send({
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
                    status: false,
                    statusCode: 500,
                    statusrun: 0,
                    cache: 'no cache', 
                    message: 'headers or body is null',
                    message_th: 'ไม่พบ headers หรือ body กรุณาตรวจสอบ',
                })
                return 
            }
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
            reply.header('code',200) 
            reply.code(200).send({
                title: { status: true, statusCode: 200},  
                message: 'jwt verify',
                message_th: 'ถอดรหัส jwt',
                data: jwtdata,
                // token: token,
                // str: str,
                // headers: headers, body: body,query: query,
            }) 
        return
    })
    /*********************************/
    fastify.decorate('authenticateuser', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        const body: any = request.body
        const input: any = body.input
        const params: any = request.params
        const headers: any = request.headers
        try {
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
            reply.header('code',200) 
            reply.code(200).send({
                title: { status: true, statusCode: 200},  
                message: 'jwt verify',
                message_th: 'ถอดรหัส jwt',
                data: jwtdata,
                // token: token,
                // str: str,
                // headers: headers, body: body,query: query,
            }) 
            return
            /*********************************/
        } catch (error) {
            console.log('jwt error :'+error) 
            reply.send({
                title: {
                        status: false,
                        statusCode : 500,
                        message: 'token is null or error or Token Expired :',
                        message_th: 'ไม่พบข้อมูล token หรือ token ไม่ถูกต้อง หรือ  โทเค็น หมดอายุ',
                        cache: 'no cache'
                },
                error: error,
                data: {  error:error } 
            })
             return //reply.sent = true // exit loop  
        }
    })
    /*********************************/
    fastify.decorate('checkexpire', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        try {
            /******************************ตรวจสอบวันหมดอายุ Token check*************************************/ 
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
            reply.header('code',200) 
            reply.code(200).send({
                title: { status: true, statusCode: 200},  
                message: 'jwt verify',
                message_th: 'ถอดรหัส jwt',
                data: jwtdata,
                // token: token,
                // str: str,
                // headers: headers, body: body,query: query,
            }) 
            return 
        } catch (error) {
            console.log(error)
            reply.code(500).send({ // แสดงข้อมูล api
                                title: {
                                        status: false,
                                        statusCode: 500,
                                        message: 'Results unsuccessful',
                                        message_th: 'แสดง ข้อมูลไม่สำเร็จ',
                                        cache: 'no cache'
                                    },  
                                    error: error,
                                    data: null
            })
             return //reply.sent = true // exit loop  ออกจากลูปการทำงาน 
        }
    /*******************************************/
    })
    /*********************************/
    fastify.decorate('encode', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        const body: any = request.body
        const payload: any = request.body
        // const username = body.username
        // const password = body.password
        /*
            const token = fastify.jwt.sign({ payload })
            reply.send({ token })
        */
        try {
            const tokens = fastify.jwt.sign({body})
             reply.send({
                title:{ status: true, statusCode : 200,}, 
                token:tokens,
            })
            return  // reply.sent = true // exit loop  ออกจากลูปการทำงาน
                     
            /*********************************/
        } catch (error) {
            console.log('jwt error :' + error)
            reply.header('version', 1)
            reply.header('x-cache-status', 0) // 1=yes ,0=no
            reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            reply.header('Expires', '-1')
            reply.header('Pragma', 'no-cache')  
            reply.send({
                title: {
                        status: false,
                        statusCode : 500,
                        message: 'input is null or error',
                        message_th: 'ไม่พบข้อมูล input หรือ input ไม่ถูกต้อง',
                        cache: 'no cache'
                },
                data: {error:error} 
            })
             return //reply.sent = true // exit loop  ออกจากลูปการทำงาน 
        }
    })
    fastify.decorate('verify', async (request: FastifyRequest, reply: FastifyReply) => {
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
                    nameservice: 'Micro service tppy-tcas',
                    message: 'Maintenance mode , Sorry for the inconvenience',
                    message_th: 'อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก',
                })
                return
            }
        } catch (error) { }
        
        const headers: any = request.headers
        const query_get: any = request.query
        const protocol: any = request.protocol
        const ip: any = request.ip
        const body: any = request.body
        const token = body.token 
        try {
             const decoded: any = fastify.jwt.verify(token)
             //const user_id = decoded['user_id']
             reply.send({
                title:{ status: true, statusCode : 200,}, 
                data:decoded,
            })
            return  // reply.sent = true // exit loop      
            /*********************************/
        } catch (error) {
            console.log('jwt error :' + error)
            reply.header('version', 1)
            reply.header('x-cache-status', 0) // 1=yes ,0=no
            reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            reply.header('Expires', '-1')
            reply.header('Pragma', 'no-cache')  
            reply.send({
                title: {
                        status: false,
                        statusCode : 500,
                        message: 'token is null or error',
                        message_th: 'ไม่พบข้อมูล token หรือ token ไม่ถูกต้อง',
                        cache: 'no cache'
                },
                data: {error:error} 
            })
             return //reply.sent = true // exit loop  ออกจากลูปการทำงาน 
        }
    })
    /*********************************/
})