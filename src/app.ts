import * as fastify from 'fastify'
import * as path from 'path'
const util = require('util')
const multer = require('fastify-multer')
const autoload = require('fastify-autoload')
var envPath = path.join(__dirname, '../config.conf') 
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
console.log("DB1_HOST: ", env.DB1_HOST)
/**************************/
import routers from './router'
/**************************/
const app: fastify.FastifyInstance = fastify.fastify({
    logger: {
        level: 'info'
    }
})
app.register(multer.contentParser) 
app.register(require('fastify-cors'), { 
  // put your options here
})
app.register(require('fastify-formbody'))
/**************************/
// knex db connect  webservicedb register knex db2  CRUD MYSQL
app.register(require('./system/database/mysqldb'), {
    options: {
        client: 'mysql2',
        connection: {
            host: env.DB1_HOST,
            port: Number(env.DB1_PORT), 
            user: env.DB1_USER,
            password: env.DB1_PASSWORD,
            database: env.DB1_NAME
        },
        debug: true
    },
    connectionName: 'db1'
})
app.register(require('./system/database/mysqldb'), {
    options: {
        client: 'mysql2',
        connection: {
            host: env.DB2_HOST,
            port: Number(env.DB2_PORT),
            user: env.DB2_USER,
            password: env.DB2_PASSWORD,
            database: env.DB2_NAME
        },
        debug: true
    },
    connectionName: 'db2'
})
/**************************/ 
app.register(require('./system/plugins/jwt'), {
    secret: env.JWT_SECRET  
})
/**************************/
app.register(require('fastify-static'), {
    root: path.join(__dirname, '../public'),
    prefix: '/assets/'
})
/**************************/
app.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs'),
        root: path.join(__dirname, '../views'),
    },
    includeViewExtension: true
})
// typeorm connection
import {createConnection } from "typeorm";
createConnection({
            type: "mysql",
            host: env.DB1_HOST,
            port: Number(env.DB1_PORT), 
            username: env.DB1_USER,
            password: env.DB1_PASSWORD,
            database: env.DB1_NAME, 
            synchronize: true,   //  if ALTER TABLE  true ,false
            logging: true, //  if show log   true ,false
            entities: ["src/entities/*{.ts,.js}"], 
            migrations: ["src/migration/**/*.ts"],
            subscribers: ["src/subscriber/**/*.ts"],
            cli: {
                entitiesDir: "src/entities",
                migrationsDir: "src/migration",
                subscribersDir: "src/subscriber",
              },
}).then(connection => {
        console.log("typeorm is Connection : ",util.inspect( ' database : '+env.DB1_NAME+' status :'+connection.isConnected, { showHidden: true, depth: true, colors: true }))
})
.catch(err => {
    console.error("typeorm Unable to connect to the database:", err);
})
/************ config typeorm end**************/
app.register(routers)
export default app