import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
/************* validate schemas*******************/
import * as path from 'path'
const envPath = path.join(__dirname, '../../../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const mode = env.mode
import accesstokenSchema from '../../../schemas/accesstokenSchema' 
// console.log("mode: ", mode)
export default async function index(fastify: FastifyInstance) {
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
          console.log(request.body) 
})
/**************************************************/  
fastify.post('/ui', async (request: FastifyRequest, reply: FastifyReply) => {
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
                            message: "Welcome to tppy-tcas!",
                            message_th: "tppy-tcas ยินดีตอนรับ!",
                            status: true,
                            status_int: 1,
                            statusCode : 200,
                            version: "1.0.0",
                            author: 'kongnakornjantakun@gmail.com',
                        }, 
                    body: { data: null,error: null,   }, 
                },
            )
})
/***************/
fastify.get('/ui', async (request: FastifyRequest, reply: FastifyReply) => {
    const message = 'Welcome to tppy-tcas!'
    reply.view('/views/index', { message: message })
})
fastify.post('/jwt/signtest', async (request: FastifyRequest, reply: FastifyReply) => {
      const token = fastify.jwt.sign({
        username: 'Kongnakorn',
        password: 'Jantakun',
        // level: 1, 
        // accesszone: 1,
        // email: 'kongnakornna@gmail.com',
      })
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
fastify.post('/jwt/private', { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
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
fastify.post('/jwt/authentication',{preValidation: [fastify.authenticate]},async (request: FastifyRequest, reply: FastifyReply) => {
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
  var timeset : any = '10h' // 60, "2 days", "10h", "7d".
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
/*****************************************************/
/**************************************************/  
/**************************************************/  
}