import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
/************* validate schemas*******************/
import * as path from 'path'
const envPath = path.join(__dirname, '../../../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const mode = env.mode
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
              reply.header('code', 200)
              reply.code(200).send({
                      title: { status: true, statusCode: 200, mode:'service' },
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
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
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
              reply.header('code', 200)
              reply.code(200).send({
                      title: { status: true, statusCode: 200, mode:'service' },
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
                    title: { status: false, statusCode: 500, mode:'Maintenance mode' },
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
fastify.post('/ui', async (request: FastifyRequest, reply: FastifyReply) => {
      reply.header('version', 1)
      reply.header('x-cache-status', 0) // 1=yes ,0=no
      reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
      reply.header('Expires', '-1')
      reply.header('Pragma', 'no-cache')  
      reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
      reply.header('message', 'Working')
      reply.header('code', 200)
      reply.header('status', true) 
      /*****************************************************/
      reply.send({
                    title: {
                            message: "Welcome to app Service!",
                            message_th: "app Service ยินดีตอนรับ!",
                            status: true,
                            status_int: 1,
                            statusCode : 200,
                            version: "1.0.0",
                            author: 'kongnakornna@gmail.com',
                        }, 
                    body: { data: null,error: null,   }, 
                },
            )
})
/***************/
fastify.get('/ui', async (request: FastifyRequest, reply: FastifyReply) => {
    const message = 'Welcome to app Service!'
    reply.view('/views/index', { message: message })
})
fastify.get('/jwt/signtest', async (request: FastifyRequest, reply: FastifyReply) => {
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
      reply.header('code', 200)
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
fastify.get('/jwt/private', { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.header('version', 1)
      reply.header('x-cache-status', 0) // 1=yes ,0=no
      reply.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
      reply.header('Expires', '-1')
      reply.header('Pragma', 'no-cache')  
      reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
      reply.header('message', 'Working')
      reply.header('code', 200)
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
/**************************************************/  
}