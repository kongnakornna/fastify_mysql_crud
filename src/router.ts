import { FastifyInstance } from 'fastify'
import indexRouter from './modules/index/controllers/index'
import authRouter from './modules/auth/controllers/auth' 
import administratorRouter from './modules/administrator/controllers/administrator' 
import authadministratorRouter from './modules/administrator/controllers/auth' 
import userRouter from './controllers/user'
import studentRouter from './controllers/student'
export default async function router(fastify: FastifyInstance) {
    fastify.register(indexRouter, { prefix: '/' }) 
    fastify.register(authRouter, { prefix: '/auth' })
    fastify.register(administratorRouter, { prefix: '/administrator' })
    fastify.register(authadministratorRouter, { prefix: '/authadministrator' })
    fastify.register(userRouter, { prefix: '/user' })  
    fastify.register(studentRouter, { prefix: '/student' })  
}