"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,r){e[r=void 0===r?a:r]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t},__awaiter=this&&this.__awaiter||function(e,n,d,c){return new(d=d||Promise)(function(a,t){function r(e){try{o(c.next(e))}catch(e){t(e)}}function s(e){try{o(c.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof d?t:new d(function(e){e(t)})).then(r,s)}o((c=c.apply(e,n||[])).next())})},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const fastify_plugin_1=__importDefault(require("fastify-plugin")),path=__importStar(require("path")),cookie=require("fastify-cookie"),envPath=path.join(__dirname,"../../../config.conf");require("dotenv").config({path:envPath});const env=process.env,opts={},TIMEEXPIRE=env.TIMEEXPIRE,redis_host=env.redis_host,redis_port=env.redis_port,mode=env.mode,fastify=__importStar(require("fastify")),app=fastify.fastify({logger:{level:"info"}});module.exports=(0,fastify_plugin_1.default)((m,e)=>__awaiter(void 0,void 0,void 0,function*(){function r(e){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#",a="",r=0;r<e;r++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}function s(e){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a="",r=0;r<e;r++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}function o(e){for(var t="0123456789",a="",r=0;r<e;r++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}m.register(require("fastify-jwt"),{secret:e.secret}),m.decorate("authenapi",(e,t)=>__awaiter(void 0,void 0,void 0,function*(){try{return void(yield e.jwtVerify())}catch(e){return void t.send(e)}})),m.decorate("genint",(t,a)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return a.header("status",!1),a.header("statusCode",500),a.header("code",500),void a.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}t.headers;e=t.query,t.protocol,t.ip,e.code,e=o(4);try{return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("state",e),a.header("statusCode",200),a.header("status",!0),a.send({genint:e,message:"ok"}),void console.log("jwt Verify request :"+t)}catch(e){return a.header("genint",""),a.header("statusCode",200),a.header("status",!1),a.header("message",e),void a.send({genint:"",message:e})}})),m.decorate("codegen",(t,a)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return a.header("status",!1),a.header("statusCode",500),a.header("code",500),void a.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}t.headers;e=t.query,t.protocol,t.ip,e.code,e=s(12)+"-"+s(10)+"-"+s(8)+"-"+s(6)+"-"+function(e){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",a="",r=0;r<e;r++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}(5)+"-"+o(5);try{return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("code",e),a.header("statusCode",200),a.header("status",!0),a.send({code:e,message:"ok"}),void console.log("jwt Verify request :"+t)}catch(e){return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("code",""),a.header("statusCode",200),a.header("status",!1),a.header("message",e),void a.send({code:"",message:e})}})),m.decorate("getstate",(t,a)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return a.header("status",!1),a.header("statusCode",500),a.header("code",500),void a.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}t.headers;e=t.query,t.protocol,t.ip,e.code,e=r(32);try{return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("state",e),a.header("statusCode",200),a.header("status",!0),a.send({state:e,message:"ok"}),void console.log("jwt Verify request :"+t)}catch(e){return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("state",""),a.header("statusCode",200),a.header("status",!1),a.header("message",e),void a.send({state:"",message:e})}})),m.decorate("clientsecret",(t,a)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return a.header("status",!1),a.header("statusCode",500),a.header("code",500),void a.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}t.headers;e=t.query,t.protocol,t.ip,e.code,e=r(64);try{return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("clientsecret",e),a.header("statusCode",200),a.header("status",!0),a.send({clientsecret:e,message:"ok"}),void console.log("jwt Verify request :"+t)}catch(e){return a.header("version",1),a.header("x-cache-status",0),a.header("Cache-Control","private, no-cache, no-store, must-revalidate"),a.header("Expires","-1"),a.header("Pragma","no-cache"),a.header("clientsecret",""),a.header("statusCode",200),a.header("status",!1),a.header("message",e),void a.send({clientsecret:"",message:e})}})),m.decorate("authen",(t,a)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return a.header("status",!1),a.header("statusCode",500),a.header("code",500),void a.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}t.headers,t.query,t.protocol,t.ip;try{yield t.jwtVerify(),a.header("verify","ok"),console.log("jwt Verify request :"+t)}catch(e){return a.header("verify",e),void a.send({title:{status:!1,statusCode:500,message:e,message_th:"ไม่พบข้อมูลโทเค็น หรือ โทเค็นไม่ถูกต้อง",cache:"no cache"},data:e})}})),m.decorate("mode",(e,t)=>__awaiter(void 0,void 0,void 0,function*(){try{return t.header("status",!1),t.header("statusCode",500),t.header("code",500),void t.code(500).send({status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก",error:null})}catch(e){return console.log("jwt error :"+e),t.header("version",1),t.header("x-cache-status",0),t.header("Cache-Control","private, no-cache, no-store, must-revalidate"),t.header("Expires","-1"),t.header("Pragma","no-cache"),t.header("Access-Control-Allow-Methods","POST"),t.header("message","Information Correct"),t.header("statusCode",500),t.header("status",!0),void t.code(500).send({statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"System interrupted , Sorry for the inconvenience",message_th:"ระบบทำงานขัดข้อง ขออภัยความไม่สะดวก",error:e})}})),m.decorate("authenticate",(e,t)=>__awaiter(void 0,void 0,void 0,function*(){try{yield e.jwtVerify()}catch(e){t.send(e)}})),m.decorate("authenticatecheckexpire",(d,c)=>__awaiter(void 0,void 0,void 0,function*(){d.headers;var e=d.body,t=(d.query,env.mode);try{if(1!=t)return c.header("status",!1),c.header("statusCode",500),c.header("code",500),void c.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}if(null==e)return c.header("status",!1),c.header("statusCode",500),c.header("code",500),void c.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",message:"headers or body is null",message_th:"ไม่พบ headers หรือ body กรุณาตรวจสอบ"});const a=d.headers.authorization;var r=a.replace("Bearer ",""),s=m.jwt.verify(r);const o={};var n=(o.token=s).iat,t=s.exp;o.start_token=n;e=(o.end_token=t)-n,Date.now(),n=(new Date).getTime(),n=Math.round(n/1e3),n=t-(o.now=n);o.time_expire_setting=e,o.expire_in=n,o.token=r,o.decode=s,c.header("version",1),c.header("x-cache-status",0),c.header("code",200),c.code(200).send({title:{status:!0,statusCode:200},message:"jwt verify",message_th:"ถอดรหัส jwt",data:o})})),m.decorate("authenticateuser",(u,v)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return v.header("status",!1),v.header("statusCode",500),v.header("code",500),void v.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}u.body.input,u.params,u.headers;try{const i=u.headers.authorization;var t=i.replace("Bearer ",""),a=m.jwt.verify(t);const h={};var r=(h.token=a).iat,s=a.exp;h.start_token=r;var o=(h.end_token=s)-r,n=(Date.now(),(new Date).getTime()),d=Math.round(n/1e3),c=s-(h.now=d);return h.time_expire_setting=o,h.expire_in=c,h.token=t,h.decode=a,v.header("version",1),v.header("x-cache-status",0),v.header("code",200),void v.code(200).send({title:{status:!0,statusCode:200},message:"jwt verify",message_th:"ถอดรหัส jwt",data:h})}catch(e){return console.log("jwt error :"+e),void v.send({title:{status:!1,statusCode:500,message:"token is null or error or Token Expired :",message_th:"ไม่พบข้อมูล token หรือ token ไม่ถูกต้อง หรือ  โทเค็น หมดอายุ",cache:"no cache"},error:e,data:{error:e}})}})),m.decorate("checkexpire",(u,v)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return v.header("status",!1),v.header("statusCode",500),v.header("code",500),void v.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}try{const i=u.headers.authorization;var t=i.replace("Bearer ",""),a=m.jwt.verify(t);const h={};var r=(h.token=a).iat,s=a.exp;h.start_token=r;var o=(h.end_token=s)-r,n=(Date.now(),(new Date).getTime()),d=Math.round(n/1e3),c=s-(h.now=d);return h.time_expire_setting=o,h.expire_in=c,h.token=t,h.decode=a,v.header("version",1),v.header("x-cache-status",0),v.header("code",200),void v.code(200).send({title:{status:!0,statusCode:200},message:"jwt verify",message_th:"ถอดรหัส jwt",data:h})}catch(e){return console.log(e),void v.code(500).send({title:{status:!1,statusCode:500,message:"Results unsuccessful",message_th:"แสดง ข้อมูลไม่สำเร็จ",cache:"no cache"},error:e,data:null})}})),m.decorate("encode",(a,r)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return r.header("status",!1),r.header("statusCode",500),r.header("code",500),void r.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}a.headers,a.query,a.protocol,a.ip;e=a.body,a.body;try{var t=m.jwt.sign({body:e});return void r.send({title:{status:!0,statusCode:200},token:t})}catch(e){return console.log("jwt error :"+e),r.header("version",1),r.header("x-cache-status",0),r.header("Cache-Control","private, no-cache, no-store, must-revalidate"),r.header("Expires","-1"),r.header("Pragma","no-cache"),void r.send({title:{status:!1,statusCode:500,message:"input is null or error",message_th:"ไม่พบข้อมูล input หรือ input ไม่ถูกต้อง",cache:"no cache"},data:{error:e}})}})),m.decorate("verify",(a,r)=>__awaiter(void 0,void 0,void 0,function*(){var e=env.mode;try{if(1!=e)return r.header("status",!1),r.header("statusCode",500),r.header("code",500),void r.code(500).send({title:{status:!1,statusCode:500,mode:"Maintenance mode"},status:!1,statusCode:500,statusrun:0,cache:"no cache",nameservice:"Micro service tppy-tcas",message:"Maintenance mode , Sorry for the inconvenience",message_th:"อยู่ระหว่างปรับปรุงระบบ ขออภัยความไม่สะดวก"})}catch(e){}a.headers,a.query,a.protocol,a.ip;e=a.body.token;try{var t=m.jwt.verify(e);return void r.send({title:{status:!0,statusCode:200},data:t})}catch(e){return console.log("jwt error :"+e),r.header("version",1),r.header("x-cache-status",0),r.header("Cache-Control","private, no-cache, no-store, must-revalidate"),r.header("Expires","-1"),r.header("Pragma","no-cache"),void r.send({title:{status:!1,statusCode:500,message:"token is null or error",message_th:"ไม่พบข้อมูล token หรือ token ไม่ถูกต้อง",cache:"no cache"},data:{error:e}})}}))}));