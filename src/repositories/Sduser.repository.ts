import * as crypto from 'crypto'
import * as path from 'path'
const envPath = path.join(__dirname, '../config.conf')
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const mode = env.mode
const util = require('util') 
/*************typeorm start******************************/
import {EntityRepository, Repository} from "typeorm";
import { Sd_users } from '../entities/Sd_users.entities'
/*************typeorm end*******************************/
@EntityRepository(Sd_users)
  
export class SduserRepository extends Repository<Sd_users> {
/*************************/
   finduser(username: string, password: string) {
      const status :any= 1 
      console.log('EntityRepository username '+username)
      console.log('EntityRepository password '+password) 
      // QueryBuilder start
      return this.createQueryBuilder("Sd_users") 
                            .select("SUM(Sd_users.user_id)", "sum") 
                            .select([
                              "Sd_users.profile_id",
                              "Sd_users.user_id AS Sd_users_uid",
                              "Sd_users.user_id", 
                              "Sd_users.username",
                              "Sd_users.email",
                              "Sd_users.firstname",
                              "Sd_users.lastname",
                              "Sd_users.fullname",
                              "Sd_users.level",
                            ])
                            .where("Sd_users.username = :username", { username })
                            .andWhere("Sd_users.password = :password", { password: password })
                            .andWhere("Sd_users.status = :status", { status })
                            .getMany()
         
    }
/*************************/
}