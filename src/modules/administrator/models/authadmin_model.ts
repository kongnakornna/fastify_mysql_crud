import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as crypto from 'crypto'
import * as path from 'path'
const envPath = path.join(__dirname, '../config.conf')
require('dotenv').config({ path: envPath })
import * as knex from 'knex';
/**************************************************/

export class AuthadminModel {
create(db1: knex, data: any) {
    return db1('ad_administrator')
      .insert(data)
  }
lastidread(db1: knex) {
    return db1('ad_administrator')
      .select('user_id')
      .orderBy('user_id','desc')
      .limit(1)
  }
updateuid(db1: knex, userId: any, data: any) {
    return db1('ad_administrator')
      .where('user_id', userId)
      .update(data)
  }
validation_email(db1: knex, email: any) {
    return db1('ad_administrator')
      .select('email')
      .where('email', email)
    }
validation_username(db1: knex, username: any) {
    return db1('ad_administrator')
      .select('username')
      .where('username', username)
    }
validation_network_id(db1: knex, network_id: any) {
    return db1('ad_administrator')
      .select('network_id')
      .where('network_id', network_id)
    }
where_ad_administrator_profile_id(db1: knex, profile_id: any) {
        return db1('ad_administrator')
            .select('user_id', 'firstname', 'lastname', 'email')
            .select('username', 'level', 'status', 'network_id')
            .select('date')
        .where('profile_id', profile_id)
    }
where_user_update_password(db1: knex, username: any, data: any) {
        return db1('ad_administrator')
        .where('username', username)
        .update(data)
    }
where_user_update_mail(db1: knex, emailold: any, data: any) {
      return db1('ad_administrator')
      .where('email', emailold)
      .update(data)
    }
where_ad_administrator_profile_id_update(db1: knex, user_id: any, data: any) {
        return db1('ad_administrator')
        .where('user_id', user_id)
        .update(data)
    }
where_ad_administrator_profile_id_remove(db1: knex, profile_id: any) {
        return db1('ad_administrator')
        .where('profile_id', profile_id)
        .del()
    }
ad_administrator_profile(db1: knex, user_id: any) {
    return db1('ad_administrator')
      .select('user_id', 'firstname', 'lastname', 'email', 'username', 'level', 'status', 'network_id')
      .where('user_id', user_id)
   } 

// Raw query
rawQuery(db1: knex, userId: any, firstName: any) {
    const sql = `
    SELECT user_id, firstname, lastname,email
    FROM users
    WHERE user_id=? AND firstname=?
    ORDER BY firstname DESC
    `
    return db1.raw(sql, [userId, firstName])
  }

test(db1: knex) {
        return db1('ad_administrator as u')
            .join('ad_administrator_profile as p', 'u.user_id', 'p.user_id')
            // .select('u.*')
            .select('u.user_id', 'u.firstname', 'u.lastname', 'u.email', 'u.date')
            .select('p.email as mail')
            // .where('users.user_id!=','')
            .orderBy('u.user_id', 'desc')
            .limit(3)
            .offset(5)
    }
whereRawQuery(db1: knex) {
    return db1('ad_administrator')
      .select('*')
      .whereRaw('group')
  }
 /**************************************************/    
 
/****************ad_administrator**********************************/  
 
profile(db1: knex, user_id: any) {
      return db1('ad_administrator')
            .select('*')
            .where('user_id', user_id)
}
where_ad_administrator_profile_id_all(db1: knex, user_id: any) {
      return db1('ad_administrator')
            .select('*')
            .where('user_id', user_id)
}
 
verifyview(db1: knex, user_id: any) {
      return db1('ad_administrator')
            //.select('*')
            .select('user_id', 'email', 'username', 'role_id')
            .where('user_id', user_id)
}
verify(db1: knex, user_id: any, data: any) {
      return db1('ad_administrator')
      .where('user_id', user_id)
      .update(data)
}

administrator_get_id(db1: knex, user_id: any) {
  return db1('ad_administrator')
    .select('user_id', 'email', 'username', 'role_id', 'status', 'network_id')
    .where('user_id', user_id)
}
ad_administrator_get_id(db1: knex, user_id: any) {
  return db1('ad_administrator')
    .select('user_id', 'email', 'username', 'role_id', 'status', 'network_id')
    .where('user_id', user_id)
}
login(db1: knex, username: any, password: any) {
  const data1: any = {}
  const data = db1('ad_administrator')
    .select('user_id', 'email', 'username', 'role_id')
    .where('username', username)
    .where('password', password)
    .where('status', 1)
    //.orWhereNotIn('role_id', [1, 2]) 
    //.orWhereNotIn('user_id', [1]) 
  return data
}
resetPassword(db1: knex, datareset: any) {
  return db1('ad_administrator')
    .select('user_id', 'email', 'username', 'role_id')
    .where('username', datareset)
    .orWhere('email', datareset)
}
resetpwd(db1: knex, datareset: any) {
  return db1('ad_administrator')
    .select('user_id', 'email', 'username', 'role_id')
    .where('username', datareset)
    .orWhere('email', datareset)
}
read(db1: knex) {
  return db1('ad_administrator')
    .select('user_id', 'email')
    .orderBy('user_id','desc')
    //.limit(3)
    // .offset(5)
    
}
search(db1: knex, query: any) {
  const _query = '%' + query + '%'
  return db1('ad_administrator')
    .select('user_id', 'email')
    .where('username', 'like', _query)
    //.andWhere('status', '1')
    .orWhere('user_id', 'like', _query)
    .orderBy('user_id')
}
update(db1: knex, userId: any, data: any) {
  return db1('ad_administrator')
    .where('user_id', userId)
    .update(data)
}
remove(db1: knex, userId: any) {
  return db1('ad_administrator')
    .where('user_id', userId)
    .del()
}
/****************language**********************************/ 
tr_language_all(db1: knex) {
  return db1('tr_language').select('*') 
}
tr_language_all_id(db1: knex, id: any) {
    var result: any = {}
    if (id === null) {
      result = db1('tr_language').select('*')
    } else {
     result = db1('tr_language')
        .select('*')
        .where('user_id', id)
    }
 return result
} 
/***************header code***********************************/    
he_header(db1: knex) {
  return db1('he_header').select('*') 
}
/*****************roles*********************************/
// ad_administrator_history
create_history(db1: knex, data: any) { 
  const rs = db1('ad_administrator_history').insert(data)
  return rs
}
create_roles(db1: knex, data: any) { 
  const rs = db1('ad_administrator_roles').insert(data)
  return rs
}
create_administrator_roles(db1: knex, data: any) { 
  const rs = db1('ad_administrator_roles').insert(data)
  return rs
}
validation_administrator_roles(db1: knex, user_id: any) {
  return db1('ad_administrator_roles')
    .select('user_id')
    .where('user_id', user_id)
    //.where('role_id', role_id)
}
view_administrator_roles(db1: knex, user_id: any, role_id: any) {
  if (user_id !== null && role_id == null) {
    return db1('ad_administrator_roles')
      .select('user_id')
      .where('user_id', user_id)
  }
  if (user_id == null && role_id !== null) {
    return db1('ad_administrator_roles')
      .select('user_id')
      .where('role_id', role_id)
  }
  if (user_id!== null && role_id !== null) {
    return db1('ad_administrator_roles')
      .select('user_id')
      .where('user_id', user_id)
      .where('role_id', role_id)
    }

}
/*****************address*********************************/    
create_address(db1: knex, data: any) { 
  const rs = db1('ad_administrator_address').insert(data)
  return rs
}
validation_address_user_id(db1: knex, user_id: any,language_id: any) {
  return db1('ad_administrator_address')
    .select('user_id')
    .where('user_id', user_id)
    .where('language_id', language_id)
}
/***************profile***********************************/    
update_profile_lang(db1: knex, user_id: any,language_id: any, data: any) {
  return db1('ad_administrator_profile')
    .where('user_id', user_id)
    .where('language_id', language_id)
    .update(data)
}  
create_profile(db1: knex, data: any) {
  //const dataal = db1('tr_language').select('language_id', 'code', 'name') 
  const rs = db1('ad_administrator_profile').insert(data)
  return rs
}
validation_profile_user_id(db1: knex, user_id: any,language_id: any) {
  return db1('ad_administrator_profile')
    .select('user_id')
    .where('user_id', user_id)
    .where('language_id', language_id)
}
last_id_read_profile(db1: knex) {
  return db1('ad_administrator_profile')
    .select('user_id')
    .orderBy('user_id','desc')
}
/**************************************************/  
}