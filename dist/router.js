"use strict";var __awaiter=this&&this.__awaiter||function(e,o,a,s){return new(a=a||Promise)(function(r,t){function u(e){try{n(s.next(e))}catch(e){t(e)}}function i(e){try{n(s.throw(e))}catch(e){t(e)}}function n(e){var t;e.done?r(e.value):((t=e.value)instanceof a?t:new a(function(e){e(t)})).then(u,i)}n((s=s.apply(e,o||[])).next())})},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const index_1=__importDefault(require("./modules/index/controllers/index")),auth_1=__importDefault(require("./modules/auth/controllers/auth")),user_1=__importDefault(require("./controllers/user"));function router(e){return __awaiter(this,void 0,void 0,function*(){e.register(index_1.default,{prefix:"/"}),e.register(index_1.default,{prefix:"/test"}),e.register(auth_1.default,{prefix:"/auth"}),e.register(user_1.default,{prefix:"/user"})})}exports.default=router;