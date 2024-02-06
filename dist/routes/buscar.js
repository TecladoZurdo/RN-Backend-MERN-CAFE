"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { buscar } = require('../controllers/buscar');
const router = (0, express_1.Router)();
router.get('/:coleccion/:termino', buscar);
exports.default = router;
//# sourceMappingURL=buscar.js.map