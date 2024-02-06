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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];
const buscarUsuarios = (termino = '', res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = ObjectId.isValid(termino); // TRUE 
    if (esMongoID) {
        const usuario = yield Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = yield Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuarios
    });
});
const buscarCategorias = (termino = '', res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = ObjectId.isValid(termino); // TRUE 
    if (esMongoID) {
        const categoria = yield Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = yield Categoria.find({ nombre: regex, estado: true });
    res.json({
        results: categorias
    });
});
const buscarProductos = (termino = '', res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = ObjectId.isValid(termino); // TRUE 
    if (esMongoID) {
        const producto = yield Producto.findById(termino)
            .populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const productos = yield Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre');
    res.json({
        results: productos
    });
});
const buscar = (req, res = express_1.response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            });
    }
};
exports.default = buscar;
//# sourceMappingURL=buscar.js.map