import * as path from 'path'
const envPath = path.join(__dirname, '../../../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const SERVICE_ID = env.MICRO_SERVICE_ID

export class SystemError extends Error {
  statusCode = 500
  constructor() {
    super('Unexpected error')
    Object.setPrototypeOf(this, SystemError.prototype)
  }
  serializeErrors() {
    const MICRO_SERVICE_ID: any = SERVICE_ID
    return {
      title: {
        status: true,
        statusCode: 500,
        message: this.message,
        message_th: 'ไม่พบข้อมูล token หรือ API ทำงานผิด พลาด หรือ ข้อมูลไม่ตรงกับ ค่าที่กำหนด กรุณาตรวสอบ',
        message_en: 'The token information was not found. or The API is working incorrectly, or the data does not match the specified value ,please check',
        error: 500,
      },
      id: MICRO_SERVICE_ID + this.statusCode,
      micro_servive_id: MICRO_SERVICE_ID,
      code: this.statusCode,
      href: 'error_url' + this.statusCode,
    }
  }
}


 