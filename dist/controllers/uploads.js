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
exports.actualizarImagenCloudinary = exports.mostrarImagen = exports.actualizarImagen = exports.cargarArchivo = void 0;
const express_1 = require("express");
const subir_archivo_1 = __importDefault(require("../helpers/subir-archivo"));
const usuario_1 = __importDefault(require("../models/usuario"));
const producto_1 = __importDefault(require("../models/producto"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const cargarArchivo = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = yield (0, subir_archivo_1.default)(req.files, undefined, "imgs");
        res.json({ nombre });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarImagen = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, "../uploads", coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    const nombre = yield (0, subir_archivo_1.default)(req.files, undefined, coleccion);
    modelo.img = nombre;
    yield modelo.save();
    res.json(modelo);
});
exports.actualizarImagen = actualizarImagen;
const actualizarImagenCloudinary = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    // Limpiar imágenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split("/");
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split(".");
        cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = yield cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    yield modelo.save();
    res.json(modelo);
});
exports.actualizarImagenCloudinary = actualizarImagenCloudinary;
const mostrarImagen = (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, "../uploads", coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathImagen = path_1.default.join(__dirname, "../assets/no-image.jpg");
    res.sendFile(pathImagen);
});
exports.mostrarImagen = mostrarImagen;
//# sourceMappingURL=uploads.js.map