import * as crypto from 'crypto'
import * as path from 'path'
const envPath = path.join(__dirname, '../.env') 
require('dotenv').config({ path: envPath })
const env = process.env 
const opts = {}
const TIMEEXPIRE = env.TIMEEXPIRE
const mode = env.mode
const util = require('util') 
/*************typeorm start******************************/
import {EntityRepository, Repository} from "typeorm";
import { Ad_administrator} from '../entities/Ad_administrator.entities'
/*************typeorm end*******************************/
@EntityRepository(Ad_administrator)
  
export class adminRepository extends Repository<Ad_administrator> {
/*************************/
   finduser(username: string, password: string) {
      const status :any= 1 
      console.log('EntityRepository username '+username)
      console.log('EntityRepository password '+password) 
      // QueryBuilder start
      return this.createQueryBuilder("Ad_administrator") 
                            .select("SUM(Ad_administrator.user_id)", "sum") 
                            .select([
                              "Ad_administrator.profile_id",
                              "Ad_administrator.user_id AS Ad_administrator_uid",
                              "Ad_administrator.user_id", 
                              "Ad_administrator.username",
                              "Ad_administrator.email",
                              "Ad_administrator.firstname",
                              "Ad_administrator.lastname",
                              "Ad_administrator.fullname",
                              "Ad_administrator.level",
                            ])
                            .where("Ad_administrator.username = :username", { username })
                            .andWhere("Ad_administrator.password = :password", { password: password })
                            .andWhere("Ad_administrator.status = :status", { status })
                            .getMany()
         
    }
/*************************/
}