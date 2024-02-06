"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../controllers/productos");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const router = (0, express_1.Router)();
/**
 * {{url}}/api/categorias
 */
//  Obtener todas las categorias - publico
router.get('/', productos_1.obtenerProductos);
// Obtener una categoria por id - publico
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoPorId),
    validar_campos_1.default,
], productos_1.obtenerProducto);
// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validar_jwt_1.default,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('categoria', 'No es un id de Mongo').isMongoId(),
    (0, express_validator_1.check)('categoria').custom(db_validators_1.existeCategoriaPorId),
    validar_campos_1.default
], productos_1.crearProducto);
// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validar_jwt_1.default,
    // check('categoria','No es un id de Mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoPorId),
    validar_campos_1.default
], productos_1.actualizarProducto);
// Borrar una categoria - Admin
router.delete('/:id', [
    validar_jwt_1.default,
    validar_roles_1.esAdminRole,
    (0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoPorId),
    validar_campos_1.default,
], productos_1.borrarProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map