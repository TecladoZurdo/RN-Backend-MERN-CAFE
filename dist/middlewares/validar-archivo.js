"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarArchivoSubir = (req, res = express_1.response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: "No hay archivos que subir - validarArchivoSubir",
        });
    }
    next();
};
exports.default = validarArchivoSubir;
//# sourceMappingURL=validar-archivo.js.map