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
exports.borrarCategoria = exports.actualizarCategoria = exports.obtenerCategoria = exports.obtenerCategorias = exports.crearCategoria = void 0;
const express_1 = require("express");
const categoria_1 = __importDefault(require("../models/categoria"));
const obtenerCategorias = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = yield Promise.all([
        categoria_1.default.countDocuments(query),
        categoria_1.default.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        categorias
    });
});
exports.obtenerCategorias = obtenerCategorias;
const obtenerCategoria = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findById(id)
        .populate('usuario', 'nombre');
    res.json(categoria);
});
exports.obtenerCategoria = obtenerCategoria;
const crearCategoria = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = yield categoria_1.default.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    };
    const categoria = new categoria_1.default(data);
    // Guardar DB
    yield categoria.save();
    res.status(201).json(categoria);
});
exports.crearCategoria = crearCategoria;
const actualizarCategoria = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado, usuario } = _a, data = __rest(_a, ["estado", "usuario"]);
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = yield categoria_1.default.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
});
exports.actualizarCategoria = actualizarCategoria;
const borrarCategoria = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoriaBorrada = yield categoria_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoriaBorrada);
});
exports.borrarCategoria = borrarCategoria;
//# sourceMappingURL=categorias.js.map