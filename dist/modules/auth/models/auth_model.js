"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,r,s,t){void 0===t&&(t=s),Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[s]}})}:function(e,r,s,t){e[t=void 0===t?s:t]=r[s]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&__createBinding(r,e,s);return __setModuleDefault(r,e),r};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AuthModel=void 0;const path=__importStar(require("path")),envPath=path.join(__dirname,"../configrouter.conf");require("dotenv").config({path:envPath});class AuthModel{create(e,r){return e("sd_users").insert(r)}lastidread(e){return e("sd_users").select("user_id").orderBy("user_id","desc")}updateuid(e,r,s){return e("sd_users").where("user_id",r).update(s)}validation_email(e,r){return e("sd_users").select("email").where("email",r)}validation_username(e,r){return e("sd_users").select("username").where("username",r)}validation_network_id(e,r){return e("sd_users").select("network_id").where("network_id",r)}where_sd_users_profile_id(e,r){return e("sd_users").select("user_id","firstname","lastname","email").select("username","level","status","network_id").select("date").where("sd_users_profile_id",r)}where_user_update_password(e,r,s){return e("sd_users").where("username",r).update(s)}where_sd_users_profile_id_update(e,r,s){return e("sd_users").where("sd_users_profile_id",r).update(s)}where_sd_users_profile_id_remove(e,r){return e("sd_users").where("sd_users_profile_id",r).del()}sd_users_profile(e,r){return e("sd_users").select("user_id","firstname","lastname","email","username","level","status","network_id").where("user_id",r)}login(e,r,s){return e("sd_users").select("user_id","firstname","lastname","email","username","level").where("username",r).where("password",s).where("status",1)}resetPassword(e,r){return e("sd_users").select("user_id","firstname","lastname").select("email","username","level").where("username",r).orWhere("email",r)}resetpwd(e,r){return e("sd_users").select("user_id","firstname","lastname","email","username","level").where("username",r).orWhere("email",r)}read(e){return e("sd_users").select("user_id","firstname","lastname","email").orderBy("user_id","desc")}search(e,r){r="%"+r+"%";return e("sd_users").select("user_id","firstname","lastname","email").where("firstname","like",r).orderBy("user_id")}update(e,r,s){return e("sd_users").where("user_id",r).update(s)}remove(e,r){return e("sd_users").where("user_id",r).del()}rawQuery(e,r,s){return e.raw(`
    SELECT user_id, firstname, lastname,email
    FROM users
    WHERE user_id=? AND firstname=?
    ORDER BY firstname DESC
    `,[r,s])}test(e){return e("sd_users as u").join("sd_users_profile as p","u.user_id","p.user_id").select("u.user_id","u.firstname","u.lastname","u.email","u.date").select("p.email as mail").orderBy("u.user_id","desc").limit(3).offset(5)}whereRawQuery(e){return e("sd_users").select("*").whereRaw("group")}}exports.AuthModel=AuthModel;