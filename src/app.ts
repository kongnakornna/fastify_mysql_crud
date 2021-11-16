import * as fastify from 'fastify'
import * as path from 'path'
const util = require('util')
const multer = require('fastify-multer')
const autoload = require('fastify-autoload')
import "reflect-metadata";
import { FastifyCookieOptions } from 'fastify-cookie'
import cookie from 'fastify-cookie'
const date = new Date()
/**********conf*************/
var envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
if (process.env.NODE_ENV === "production") {
    const envPath = path.join(__dirname, '../configprod.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const address: any = env.address
    const port_main: any = env.PORT 
    console.log("production DB1_HOST: ", env.DB1_HOST)
    console.log("production DB1_NAME: ", env.DB1_NAME)
    /**************************/
    /*** typeorm connection ***/
    var path_entities1 :any= env.path_entities1 // src
    var path_entities2 :any= env.path_entities2 // dist
    var path_entities  :any= env.path_entities // dist / src
    var entities_Path = path.join(__dirname,'../'+path_entities2+'/entities/*{.ts,.js}') 
    var migrations_Path = path.join(__dirname,'../'+path_entities2+'/migration/**/*.ts') 
    var subscribers_Path = path.join(__dirname,'../'+path_entities2+'/subscriber/**/*.ts') 
    var entities_Dir = path.join(__dirname,'../'+path_entities2+'/entities/') 
    var migrations_Dir = path.join(__dirname,'../'+path_entities2+'/migration/') 
    var subscribers_Dir = path.join(__dirname, '../' + path_entities2 + '/subscriber/') 
    console.log("typeorm is Path : ", util.inspect('entities_Path :' + entities_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('migrations_Path :' + migrations_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('subscribers_Path :' + subscribers_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' entities_Path : ' + entities_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities1 : ' + migrations_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities2 : ' + subscribers_Dir, { showHidden: true, depth: true, colors: true }))
}else if (process.env.NODE_ENV === "development") {
    const envPath = path.join(__dirname, '../configdev.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const address: any = env.address 
    const port_main: any = env.PORT  
    console.log("development DB1_HOST: ", env.DB1_HOST)
    console.log("development DB1_NAME: ", env.DB1_NAME)
    /**************************/
    // typeorm connection
    var path_entities1 :any= env.path_entities1 // src
    var path_entities2 :any= env.path_entities2 // dist
    var path_entities  :any= env.path_entities // dist / src
    var entities_Path = path.join(__dirname,'../'+path_entities2+'/entities/*{.ts,.js}') 
    var migrations_Path = path.join(__dirname,'../'+path_entities2+'/migration/**/*.ts') 
    var subscribers_Path = path.join(__dirname,'../'+path_entities2+'/subscriber/**/*.ts') 
    var entities_Dir = path.join(__dirname,'../'+path_entities2+'/entities/') 
    var migrations_Dir = path.join(__dirname,'../'+path_entities2+'/migration/') 
    var subscribers_Dir = path.join(__dirname, '../' + path_entities2 + '/subscriber/') 
    console.log("typeorm is Path : ", util.inspect('entities_Path :' + entities_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('migrations_Path :' + migrations_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('subscribers_Path :' + subscribers_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' entities_Path : ' + entities_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities1 : ' + migrations_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities2 : ' + subscribers_Dir, { showHidden: true, depth: true, colors: true }))
} else {
    const envPath = path.join(__dirname, '../configlocal.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const address: any = env.address 
    const port_main: any = env.PORT 
    console.log("local DB1_HOST: ", env.DB1_HOST)
    console.log("local DB1_NAME: ", env.DB1_NAME)
    /**************************/
    // typeorm connection
    var path_entities1 :any= env.path_entities1 // src
    var path_entities2 :any= env.path_entities2 // dist
    var path_entities  :any= env.path_entities // dist / src
    var entities_Path = path.join(__dirname,'../'+path_entities+'/entities/*{.ts,.js}') 
    var migrations_Path = path.join(__dirname,'../'+path_entities+'/migration/**/*.ts') 
    var subscribers_Path = path.join(__dirname,'../'+path_entities+'/subscriber/**/*.ts') 
    var entities_Dir = path.join(__dirname,'../'+path_entities+'/entities/') 
    var migrations_Dir = path.join(__dirname,'../'+path_entities+'/migration/') 
    var subscribers_Dir = path.join(__dirname, '../' + path_entities + '/subscriber/') 
    console.log("typeorm is Path : ", util.inspect('entities_Path :' + entities_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('migrations_Path :' + migrations_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('subscribers_Path :' + subscribers_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' entities_Path : ' + entities_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities1 : ' + migrations_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities2 : ' + subscribers_Dir, { showHidden: true, depth: true, colors: true }))
}
const port_main: any = env.PORT  
const address: any = env.address 
/**********conf*************/
import routers from './router'
/**************************/


const app: fastify.FastifyInstance = fastify.fastify({
    logger: {
        level: 'info',
    }
})
app.decorate('timeset', {
    expirein: '1days', // any = "1days" // 60, "1days", "10h", "7d"    ("120" is equal to "120ms").
})
// https://github.com/fastify/fastify-cookie
app.register(cookie, {
        secret: "my-secret", // for cookies signature
        parseOptions: {}     // options for parsing cookies
    } as FastifyCookieOptions)
    app.register(require('fastify-cookie'), {
        secret:['na,sa'] //[key1, key2]
      })
app.register(multer.contentParser) 
app.register(require('fastify-cors'), { 
  // put your options here
})
app.register(require('fastify-formbody'))
/**************************/
// https://www.npmjs.com/package/sql-injection
/************sql-injection*************/
var sqlinjection = require('sql-injection');
app.register(sqlinjection);
app.register(function() {
    app.register(sqlinjection);  // add sql-injection middleware here
});
/*************sql-injection*************/
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
/**************************/
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
           // synchronize: true,   //  if ALTER TABLE  true ,false
            logging: true, //  if show log   true ,false
            entities: [entities_Path], 
            migrations: [migrations_Path],
            subscribers: [subscribers_Path],
            cli: {
                entitiesDir: entities_Dir,
                migrationsDir: migrations_Dir,
                subscribersDir: subscribers_Dir,
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