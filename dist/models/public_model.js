"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PublicModel=void 0;class PublicModel{create(e,r){return e("sd_users").insert(r)}login(e,r,s){return e("sd_users").select("user_id","firstname","lastname").where("username",r).where("password",s)}read(e){return e("sd_users").select("user_id","firstname","lastname","email").orderBy("user_id","desc")}search(e,r){r="%"+r+"%";return e("sd_users").select("user_id","firstname","lastname","email").where("firstname","like",r).orderBy("user_id")}update(e,r,s){return e("sd_users").where("user_id",r).update(s)}remove(e,r){return e("sd_users").where("user_id",r).del()}rawQuery(e,r,s){return e.raw(`
    SELECT user_id, firstname, lastname,email
    FROM users
    WHERE user_id=? AND firstname=?
    ORDER BY firstname DESC
    `,[r,s])}whereRawQuery(e){return e("sd_users").select("*").whereRaw("group")}}exports.PublicModel=PublicModel;