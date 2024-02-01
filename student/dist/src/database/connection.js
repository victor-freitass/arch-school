"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Pool({
    host: 'db',
    user: 'postgres',
    database: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});
exports.default = client;
