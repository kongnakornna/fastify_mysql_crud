import app from './app'
/**********conf*************/
import * as path from 'path'
var envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const vession: any = env.vession 
const opts = {}
// var  NODE_ENV  is form file package.json
let port_main: any = env.PORT  
if (process.env.NODE_ENV === "production") {
    const envPath = path.join(__dirname, '../configprod.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const port_main: any = env.PORT  
/**************************/
}else if (process.env.NODE_ENV === "development") {
    const envPath = path.join(__dirname, '../configdev.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const port_main: any = env.PORT   
/**************************/ 
} else {
    const envPath = path.join(__dirname, '../configlocal.conf') 
    require('dotenv').config({ path: envPath })
    const env = process.env 
    const port_main: any = env.PORT  
    /**************************/
}
/**********conf*************/
var start = async () => {
  try {
    await app.listen(port_main)
      console.log('App :'+app) 
      console.log('App register :'+app.register) 
      console.log('vession ',vession)
      console.log('envPath',envPath)
      console.log('NODE_ENV',process.env.NODE_ENV)
      console.log(`App is running at port %d on %s mode at ${new Date()}`, process.env.PORT, process.env.NODE_ENV)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()