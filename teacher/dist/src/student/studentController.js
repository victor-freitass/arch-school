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
    createAndUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, n1, n2, n3, n4, studentId } = req.body;
            if (!(name &&
                (n1 || n1 === 0) &&
                (n2 || n2 === 0) &&
                (n3 || n3 === 0) &&
                (n4 || n4 === 0)))
                return ('Set all Infos');
            if (studentId) {
                const media = ((n1 + n2 + n3 + n4) / 4).toFixed(2);
                const student = (yield connection_1.default.query(queries_1.default.getStudentById, [studentId])).rows[0];
                if (!student)
                    return res.status(400).send('Student not exists');
                connection_1.default.query(queries_1.default.updateNotas, [studentId, n1, n2, n3, n4, media], err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Sorry, Internal Server Error');
                    }
                });
                return res.status(204).send();
            }
            else {
                try {
                    const studentId = (yield connection_1.default.query(queries_1.default.insertStudent, [name])).rows[0].id;
                    const media = ((n1 + n2 + n3 + n4) / 4).toFixed(2);
                    yield connection_1.default.query(queries_1.default.insertNotas, [studentId, n1, n2, n3, n4, media]);
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).send('Sorry, Internal Server Error');
                }
                return res.status(201).send();
            }
            ;
        });
    }
    ;
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allInfos = (yield connection_1.default.query(queries_1.default.getAll)).rows;
            return res.json(allInfos);
        });
    }
}
;
exports.default = new StudentController();
