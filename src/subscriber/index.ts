import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function index(fastify: FastifyInstance) {

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Hello world!" })
  })

  fastify.get('/jwt/sign', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = fastify.jwt.sign({
      firstName: 'na',
      lastName: 'test'
    })

    reply.send({ token })

  })

  fastify.get('/jwt/private', {
    preValidation: [fastify.authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Protected area!" })
  })

}