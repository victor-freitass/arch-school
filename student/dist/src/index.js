"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./database/connection"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../config/api-doc/swagger.json"));
const terms_json_1 = __importDefault(require("../config/api-doc/terms.json"));
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.connection();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.express.use('/api-doc-terms', (req, res) => {
            return res.json(terms_json_1.default);
        });
    }
    routes() {
        this.express.use(routes_1.default);
    }
    connection() {
        connection_1.default.connect().then(_ => {
            this.express.listen(8080, () => console.log('Student API on...'));
        }).catch(e => console.log(e));
    }
}
new App();
