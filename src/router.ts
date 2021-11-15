import { FastifyInstance } from 'fastify'
import accessapiRouter from './controllers/accessapi'
import indexRouter from './modules/index/controllers/index'
import authRouter from './modules/auth/controllers/auth' 
import userRouter from './controllers/user'
export default async function router(fastify: FastifyInstance) {
    fastify.register(indexRouter, { prefix: '/' }) 
    fastify.register(accessapiRouter, { prefix: '/access' })  
    fastify.register(indexRouter, { prefix: '/test' })
    fastify.register(authRouter, { prefix: '/auth' })
    fastify.register(userRouter, { prefix: '/user' })  
}