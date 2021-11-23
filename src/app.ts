import * as fastify from 'fastify'
const util = require('util')
const multer = require('fastify-multer')
const autoload = require('fastify-autoload')
import "reflect-metadata";
const date = new Date()
/**********conf*************/
import * as path from 'path'
var envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const vession: any = env.vession 
const opts = {}
if (process.env.NODE_ENV === "production") {
    const envPath = path.join(__dirname, '../configprod.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    // const address: any = env.address 
    const port_main: any = env.PORT 
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

}else if (process.env.NODE_ENV === "development") {
    const envPath = path.join(__dirname, '../configdev.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    // const address: any = env.address 
    const port_main: any = env.PORT  
    /**************************/
    // typeorm connection
    var path_entities1 :any= env.path_entities1 // src
    var path_entities2 :any= env.path_entities2 // dist
    var path_entities  :any= env.path_entities // dist / src
    var entities_Path = path.join(__dirname,'../'+path_entities2+'/entities/*{.ts,.js}') 
    var migrations_Path = path.join(__dirname,'../'+path_entities2+'/migration/**/*.ts') 
    // var subscribers_Path = path.join(__dirname,'../'+path_entities2+'/subscriber/**/*.ts') 
    var entities_Dir = path.join(__dirname,'../'+path_entities2+'/entities/') 
    var migrations_Dir = path.join(__dirname,'../'+path_entities2+'/migration/') 
    // var subscribers_Dir = path.join(__dirname, '../' + path_entities2 + '/subscriber/') 
} else {
    const envPath = path.join(__dirname, '../configlocal.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    // const address: any = env.address 
    const port_main: any = env.PORT 
    /**************************/
    // typeorm connection
    var path_entities1 :any= env.path_entities1 // src
    var path_entities2 :any= env.path_entities2 // dist
    var path_entities  :any= env.path_entities // dist / src
    var entities_Path = path.join(__dirname,'../'+path_entities+'/entities/*{.ts,.js}') 
    var migrations_Path = path.join(__dirname,'../'+path_entities+'/migration/**/*.ts') 
    //var subscribers_Path = path.join(__dirname,'../'+path_entities+'/subscriber/**/*.ts') 
    var entities_Dir = path.join(__dirname,'../'+path_entities+'/entities/') 
    var migrations_Dir = path.join(__dirname,'../'+path_entities+'/migration/') 
    //var subscribers_Dir = path.join(__dirname, '../' + path_entities + '/subscriber/') 
    
}

const port_main: any = env.PORT  
// const address: any = env.address 
/**********conf*************/
import Routes from './router' // rountter all
/**************************/
const app: fastify.FastifyInstance = fastify.fastify({
    logger: {
        level: 'info',
    }
})
const { Unauthorized } = require('http-errors')  
app.decorate('timeset', {
    expirein: '1days', // any = "1days" // 60, "1days", "10h", "7d"    ("120" is equal to "120ms").
})
app.register(multer.contentParser) 
app.register(require('fastify-cors'), { 
  // put your options here
})
app.register(require('fastify-formbody'))
/**************************/
// knex db connect  webservicedb register knex   CRUD MYSQL
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
// jwt plugins
app.register(require('./system/plugins/jwt'), {
    secret: env.JWT_SECRET  
})
// app.register(require('./system/plugins/apikey'), {secret: env.JWT_SECRET })
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
            cli: {
                entitiesDir: entities_Dir,
                migrationsDir: migrations_Dir,
              },
}).then(connection => {
    console.log("typeorm is Connection : ", util.inspect(' db : ' + env.DB1_NAME + ' status :' + connection.isConnected, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('entities_Path :' + entities_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Path : ", util.inspect('migrations_Path :' + migrations_Path, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' entities_Path : ' + entities_Dir, { showHidden: true, depth: true, colors: true }))
    console.log("typeorm is Dir : ", util.inspect(' path_entities1 : ' + migrations_Dir, { showHidden: true, depth: true, colors: true }))
})
.catch(err => {
    console.error("typeorm Unable to connect to the database:", err);
})
/************ config typeorm end*************/


// app.register(Routes)
 app.register(Routes, { prefix: '/fastapi' });
// app.register(Routes, { prefix: '/' });
export default app;