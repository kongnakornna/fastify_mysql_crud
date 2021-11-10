
import * as crypto from 'crypto'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as path from 'path'
const envPath = path.join(__dirname, '../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const mode = env.mode
const util = require('util')
/*************typeorm start******************************/
import { getManager, getRepository } from 'typeorm'
import { Student } from '../entities/Student.entities'
/*************typeorm end*******************************/
export default async function student(fastify: FastifyInstance) {
/**************************************************/  
fastify.post('/', {}, async (request: FastifyRequest, reply: FastifyReply) => {
  /*************typeorm start******************************/
    const entityManager = getManager(); // you can also get it via getConnection().manager
    const Std = await entityManager.find(Student); /// model sql 
    console.log("Student : ", Std)
  /*************typeorm end*******************************/
    try {
        reply.header('status', true)
        reply.header('statusCode', 200)
        reply.header('code', 200)
        reply.code(200).send({  
                body: Std,
          })
        return
    } catch (error) { 
        console.log(error)
        reply.code(500).send({ status: false, error: error })
        return
    }
})   
/**************************************************/      
}
 