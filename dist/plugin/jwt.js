"use strict";var __awaiter=this&&this.__awaiter||function(t,o,u,f){return new(u=u||Promise)(function(i,e){function n(t){try{a(f.next(t))}catch(t){e(t)}}function r(t){try{a(f.throw(t))}catch(t){e(t)}}function a(t){var e;t.done?i(t.value):((e=t.value)instanceof u?e:new u(function(t){t(e)})).then(n,r)}a((f=f.apply(t,o||[])).next())})},__importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});const fastify_plugin_1=__importDefault(require("fastify-plugin"));module.exports=(0,fastify_plugin_1.default)((t,e)=>__awaiter(void 0,void 0,void 0,function*(){t.register(require("fastify-jwt"),{secret:e.secret}),t.decorate("authenticate",(t,e)=>__awaiter(void 0,void 0,void 0,function*(){try{yield t.jwtVerify()}catch(t){e.send(t)}}))}));