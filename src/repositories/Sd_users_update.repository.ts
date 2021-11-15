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
  
export class Sd_usersRepository extends Repository<Sd_users> {
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
    get_info_data_user_by_username_password(username: string, password: string) {
    const status :any= 1 
    console.log('EntityRepository username '+username)
    console.log('EntityRepository password '+password) 
    // QueryBuilder start
    return this.createQueryBuilder("Sd_users")  
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
    get_info_data_user_by_email_password(email: string, password: string) {
    const status :any= 1 
    console.log('EntityRepository email '+email)
    console.log('EntityRepository password '+password) 
    // QueryBuilder start
    return this.createQueryBuilder("Sd_users")  
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
                          .where("Sd_users.email = :email", { email })
                          .andWhere("Sd_users.password = :password", { password: password })
                          .andWhere("Sd_users.status = :status", { status })
                          .getMany()
       
    }
    /*************************/
    singin_by_user(username: string, password: string) {
        const status :any= 1 
        console.log('EntityRepository username '+username)
        console.log('EntityRepository password '+password) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder("Sd_users")  
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
    get_info_data_user_by_profile_id(profile_id: string) {
        const status :any= 1 
        console.log('EntityRepository profile_id '+profile_id) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder("Sd_users")  
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
                            .where("Sd_users.profile_id = :profile_id", { profile_id }) 
                            //.andWhere("Sd_users.status = :status", { status })
                            .getMany()
                            
                //const data_array: any = {}
                //data_array.data = user
        return user 
    }
    get_info_data_user_by_user_id(user_id: number) {
        const status :any= 1 
        console.log('EntityRepository user_id '+user_id) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder("Sd_users")   
                            .select([ 
                                "Sd_users.user_id",
                                "Sd_users.firstname",
                                "Sd_users.lastname",
                                "Sd_users.fullname",
                                "Sd_users.nickname",
                                "Sd_users.idcard",
                                "Sd_users.date",
                                "Sd_users.username",
                                "Sd_users.password",
                                "Sd_users.email",
                                "Sd_users.level",
                                "Sd_users.status",
                                "Sd_users.network_id",
                                "Sd_users.avatar",
                                "Sd_users.remark",
                                "Sd_users.infomation_agree_status",
                                "Sd_users.gender",
                                "Sd_users.birthday",
                                "Sd_users.last_sign_in",
                                "Sd_users.online_status",
                                "Sd_users.mesage",
                                "Sd_users.password_temp",
                                "Sd_users.profile_id",
                                "Sd_users.network_type_id",
                                "Sd_users.public",
                                "Sd_users.isActive",
                            ])
                            .where("Sd_users.user_id = :user_id", { user_id }) 
                            //.andWhere("Sd_users.status = :status", { status })
                            .getMany()
                            
        console.log("data : ", util.inspect(' user : ' + user, { showHidden: true, depth: true, colors: true })) 
        return user 
    }
    get_info_data_user_by_email(email: string) {
        const status :any= 1 
        console.log('EntityRepository email '+email) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder("Sd_users")  
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
                            .where("Sd_users.email = :email", { email }) 
                            //.andWhere("Sd_users.status = :status", { status })
                            .getMany()
                            
                //const data_array: any = {}
                //data_array.data = user
        return user 
    }
    get_info_data_user_by_username(username: string) {
        const status :any= 1 
        console.log('EntityRepository username '+username) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder("Sd_users")  
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
                            //.andWhere("Sd_users.status = :status", { status })
                            .getMany()
                            
                //const data_array: any = {}
                //data_array.data = user
        return user 
    }
    get_info_data_user_by_idcard(idcard: string) {
        const status :any= 1 
        console.log('EntityRepository idcard '+idcard) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder("Sd_users")  
                            .select([
                                "Sd_users.idcard",
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
                            .where("Sd_users.idcard = :idcard", { idcard }) 
                            //.andWhere("Sd_users.status = :status", { status })
                            .getMany()
                            
                //const data_array: any = {}
                //data_array.data = user
        return user 
    }
    update_user(user_id: string, data: []) {
        console.log('function update ') 
        console.log('user_id '+user_id) 
        console.log('data =>' + data) 
        let rs: any = {} 
        // return data
       
        // QueryBuilder start
        const user:any= this.createQueryBuilder()  
                            .update("Sd_users")
                            .set(data)
                            .where("Sd_users.user_id  = :user_id", { user_id })
                            .execute();
        return user 
        
    }
    delete_user(user_id: string) {
        console.log('function delete') 
        console.log('delete_user user_id '+user_id) 
        // QueryBuilder start
        const user:any= this.createQueryBuilder()  
                                .delete()
                                .from("Sd_users")
                                .where("Sd_users.user_id  = :user_id", { user_id })
                                .execute()
        return user 
    }
}
// https://tkssharma.com/nestjs-crud-using-typeorm-and-mysql/