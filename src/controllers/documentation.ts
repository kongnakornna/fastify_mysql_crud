import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
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
export default async function documentation(fastify: FastifyInstance) {
/**************************************************/
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
    reply.header('status', true) 
    reply.header('statusCode', 200)
    reply.code(200).send({
              title: { status: true, statusCode: 200, mode:'service' },
              status: true,
              statusCode: 200,
              statusrun: 1,
              cache: 'no cache',
              nameservice: 'Micro service tppy-tcas',
              message: 'documentation.',
              message_th: 'documentation',
            })
 
  /*****************************************************/
}) 
/**************************************************/   

/**************************************************/       
} 