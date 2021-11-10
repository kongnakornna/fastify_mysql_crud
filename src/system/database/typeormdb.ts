import "reflect-metadata"
import fp from "fastify-plugin"
import { createConnection, getConnectionOptions } from "typeorm"
import { User } from '../../entities/User.entities'
import { Student } from '../../entities/Student.entities'

module.exports = fp(async server => {
  try {
    // getConnectionOptions will read from ormconfig.js (or .env if that is prefered)
    const connectionOptions = await getConnectionOptions()
    Object.assign(connectionOptions, {
      options: { encrypt: true },
      synchronize: true,
      entities: [User, Student]
    })
    const connection = await createConnection(connectionOptions)

    // this object will be accessible from any fastify server instance
    server.decorate("db", {
      User: connection.getRepository(User),
      Students: connection.getRepository(Student)
    })
  } catch (error) {
    console.log(error)
  }
})