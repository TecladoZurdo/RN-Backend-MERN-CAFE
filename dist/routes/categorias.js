"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const categorias_1 = require("../controllers/categorias");
const db_validators_1 = require("../helpers/db-validators");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const router = (0, express_1.Router)();
/**
 * {{url}}/api/categorias
 */
//  Obtener todas las categorias - publico
router.get('/', categorias_1.obtenerCategorias);
// Obtener una categoria por id - publico
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaPorId),
    validar_campos_1.default,
], categorias_1.obtenerCategoria);
// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validar_jwt_1.default,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], categorias_1.crearCategoria);
// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validar_jwt_1.default,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaPorId),
    validar_campos_1.default
], categorias_1.actualizarCategoria);
// Borrar una categoria - Admin
router.delete('/:id', [
    validar_jwt_1.default,
    validar_roles_1.esAdminRole,
    (0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaPorId),
    validar_campos_1.default,
], categorias_1.borrarCategoria);
exports.default = router;
//# sourceMappingURL=categorias.js.map