"use strict";var __awaiter=this&&this.__awaiter||function(n,c,r,s){return new(r=r||Promise)(function(e,t){function o(n){try{a(s.next(n))}catch(n){t(n)}}function i(n){try{a(s.throw(n))}catch(n){t(n)}}function a(n){var t;n.done?e(n.value):((t=n.value)instanceof r?t:new r(function(n){n(t)})).then(o,i)}a((s=s.apply(n,c||[])).next())})},__importDefault=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(exports,"__esModule",{value:!0});const fastify_plugin_1=__importDefault(require("fastify-plugin")),knex=require("knex");module.exports=(0,fastify_plugin_1.default)((t,e,o)=>__awaiter(void 0,void 0,void 0,function*(){try{var n=yield knex(e.options);t.decorate(e.connectionName,n),o(),console.log("knex database connection mysql node name:"+e.connectionName+" db_Name :"+e.options.connection.database+" host :"+e.options.connection.host+" port :"+e.options.connection.port)}catch(n){o(n),console.log("knex database connection error "+n)}}));