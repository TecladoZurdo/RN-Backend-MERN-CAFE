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
exports.coleccionesPermitidas = exports.existeProductoPorId = exports.existeCategoriaPorId = exports.existeUsuarioPorId = exports.emailExiste = exports.esRoleValido = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const producto_1 = __importDefault(require("../models/producto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const Role = require('../models/role');
const esRoleValido = (rol = 'USER_ROLE') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRoleValido = esRoleValido;
const emailExiste = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeEmail = yield usuario_1.default.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeUsuario = yield usuario_1.default.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
/**
 * Categorias
 */
const existeCategoriaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeCategoria = yield categoria_1.default.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeCategoriaPorId = existeCategoriaPorId;
/**
 * Productos
 */
const existeProductoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeProducto = yield producto_1.default.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeProductoPorId = existeProductoPorId;
/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
};
exports.coleccionesPermitidas = coleccionesPermitidas;
//# sourceMappingURL=db-validators.js.map