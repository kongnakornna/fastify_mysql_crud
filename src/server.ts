import app from './app'
import * as path from 'path'
const envPath = path.join(__dirname, '../config.conf') 
const env = process.env 
const opts = {}
const address: any = env.address || '127.0.0.1'
const port_main: any = env.PORT || 8003
var start = async () => {
  try {
    await app.listen(port_main, address)
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
Run ` npx nodemon`
# Build Source Code on production
Run `npx gulp `
*/