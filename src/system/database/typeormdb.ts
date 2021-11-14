import "reflect-metadata"
import fp from "fastify-plugin"
import { createConnection, getConnectionOptions } from "typeorm"
import { Sd_users } from '../../entities/Sd_users.entities'
 
module.exports = fp(async server => {
  try {
    // getConnectionOptions will read from ormconfig.js (or .env if that is prefered)
    const connectionOptions = await getConnectionOptions()
    Object.assign(connectionOptions, {
      options: { encrypt: true },
      synchronize: true,
      entities: [Sd_users]
    })
    const connection = await createConnection(connectionOptions)

    // this object will be accessible from any fastify server instance
    server.decorate("db", {
      Sd_users: connection.getRepository(Sd_users) 
    })
  } catch (error) {
    console.log(error)
  }
})