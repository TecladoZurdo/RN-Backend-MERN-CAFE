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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPatch = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = require("express");
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const usuariosGet = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(query),
        usuario_1.default.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
});
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new usuario_1.default({ nombre, correo, password, rol });
    // Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    // Guardar en BD
    yield usuario.save();
    // Generar el JWT
    const token = yield (0, generar_jwt_1.default)(usuario.id);
    res.json({
        usuario,
        token
    });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google, correo } = _a, resto = __rest(_a, ["_id", "password", "google", "correo"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, resto);
    res.json(usuario);
});
exports.usuariosPut = usuariosPut;
const usuariosPatch = (req, res = express_1.response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
};
exports.usuariosPatch = usuariosPatch;
const usuariosDelete = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
});
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map