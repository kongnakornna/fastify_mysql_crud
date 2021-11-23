import { FastifyRequest, FastifyReply } from 'fastify'
/*********************************/
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
import swagger from 'fastify-plugin'
/*********************************/
import * as fastify from 'fastify'
const app: fastify.FastifyInstance = fastify.fastify({ logger: { level: 'info'}})
/*********************************/
module.exports = swagger(async (fastify: any, opts: any) => {
/*********************************/
 
/*********************************/    
})