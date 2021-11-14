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
  singinuser(username: string, password: string) {
    const status :any= 1 
    console.log('EntityRepository username '+username)
    console.log('EntityRepository password '+password) 
    // QueryBuilder start
    const user:any= this.createQueryBuilder("Sd_users") 
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
                          
            //const data_array: any = {}
            //data_array.data = user
      return user 
  }
/*************************/
}

//  https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#adding-where-expression

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#what-is-querybuilder

// https://www.google.com/search?q=typescript++redis&newwindow=1&rlz=1C1UEAD_enTH975TH975&sxsrf=AOaemvLN7z4U347kvwl8oax4mEMIDlcUbA%3A1636792976755&ei=kHqPYbPGLdHT1sQP17-S6Aw&oq=typescript++redis&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEMsBMgUIABDLATIFCAAQywEyBQgAEMsBMgUIABDLATIFCAAQywEyBQgAEMsBMgUIABDLATIGCAAQFhAeMgYIABAWEB46BwgjELADECc6BwgAEEcQsAM6BAgjECc6BAgAEEM6BQgAEIAEOgYIIxAnEBNKBAhBGABQmxBYui5gkUFoAnACeACAAXiIAe8EkgEDNi4xmAEAoAECoAEByAEJwAEB&sclient=gws-wiz&ved=0ahUKEwizzsz_-JT0AhXRqZUCHdefBM0Q4dUDCA4&uact=5

// https://stackoverflow.com/questions/58583532/how-to-get-redis-value-for-a-given-redis-key-using-nodejs-redis