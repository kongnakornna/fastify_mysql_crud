"use strict";var __awaiter=this&&this.__awaiter||function(e,s,u,_){return new(u=u||Promise)(function(i,t){function n(e){try{o(_.next(e))}catch(e){t(e)}}function r(e){try{o(_.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?i(e.value):((t=e.value)instanceof u?t:new u(function(e){e(t)})).then(n,r)}o((_=_.apply(e,s||[])).next())})},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),require("reflect-metadata");const fastify_plugin_1=__importDefault(require("fastify-plugin")),typeorm_1=require("typeorm"),Sd_users_entities_1=require("../../entities/Sd_users.entities");module.exports=(0,fastify_plugin_1.default)(i=>__awaiter(void 0,void 0,void 0,function*(){try{var e=yield(0,typeorm_1.getConnectionOptions)();Object.assign(e,{options:{encrypt:!0},synchronize:!0,entities:[Sd_users_entities_1.Sd_users]});const t=yield(0,typeorm_1.createConnection)(e);i.decorate("db",{Sd_users:t.getRepository(Sd_users_entities_1.Sd_users)})}catch(e){console.log(e)}}));