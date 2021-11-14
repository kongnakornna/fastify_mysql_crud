import app from './app'
/**********conf*************/
import * as path from 'path'
/**********conf*************/
var envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
// var  NODE_ENV  is form file package.json
if (process.env.NODE_ENV === "production") {
    const envPath = path.join(__dirname, '../configprod.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const address: any = env.address
    const port_main: any = env.PORT  
/**************************/
}else if (process.env.NODE_ENV === "development") {
    const envPath = path.join(__dirname, '../configdev.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const address: any = env.address 
    const port_main: any = env.PORT   
/**************************/ 
} else {
    const envPath = path.join(__dirname, '../configlocal.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const address: any = env.address 
    const port_main: any = env.PORT  
    /**************************/
}
const port_main: any = env.PORT  
const address: any = env.address 
/**********conf*************/
var start = async () => {
  try {
    await app.listen(port_main,address)
      console.log('App register :'+app.register)
      console.log('Server listening on ' + address + ':' + port_main)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
start()
// Command run
/*
# instrall
Run `npm i` 
# Dev Source Code project
- Run `npx nodemon` for a dev server.  OR  Run `npx ts-node -P tsconfig.json ./src/server.ts `
# Build Source Code on production
Run `npx gulp `  
*/