"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const queries_1 = __importDefault(require("./queries"));
class StudentController {
    getStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const student = (yield connection_1.default.query(queries_1.default.getStudent, [id])).rows[0];
            if (!student) {
                return res.status(400).send('Student not exists');
            }
            return res.json(student);
        });
    }
}
exports.default = new StudentController();
