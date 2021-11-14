"use strict";var __awaiter=this&&this.__awaiter||function(e,s,n,u){return new(n=n||Promise)(function(a,t){function r(e){try{o(u.next(e))}catch(e){t(e)}}function i(e){try{o(u.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(r,i)}o((u=u.apply(e,s||[])).next())})},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const body_1=__importDefault(require("../schemas/body")),params_1=__importDefault(require("../schemas/params")),query_string_1=__importDefault(require("../schemas/query_string")),header_1=__importDefault(require("../schemas/header"));function schema(e){return __awaiter(this,void 0,void 0,function*(){e.post("/register",{schema:body_1.default},(e,t)=>__awaiter(this,void 0,void 0,function*(){t.send({message:"Hello world!"})})),e.get("/info/:userId",{schema:params_1.default},(e,t)=>__awaiter(this,void 0,void 0,function*(){t.send({message:"User info"})})),e.get("/search",{schema:query_string_1.default},(e,t)=>__awaiter(this,void 0,void 0,function*(){t.send({message:"Search results"})})),e.get("/info",{schema:{headers:header_1.default},attachValidation:!0},(t,a)=>__awaiter(this,void 0,void 0,function*(){var e;t.validationError?(console.log(t.validationError),a.code(400).send({ok:!1,error:"ข้อมูลไม่ถูกต้อง",code:1005})):(e=t.headers,console.log(e),e=e["x-fastify-token"],a.send({ok:!0,token:e}))}))})}exports.default=schema;