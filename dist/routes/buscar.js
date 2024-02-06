"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscar_1 = __importDefault(require("../controllers/buscar"));
const router = (0, express_1.Router)();
router.get('/:coleccion/:termino', buscar_1.default);
exports.default = router;
//# sourceMappingURL=buscar.js.map