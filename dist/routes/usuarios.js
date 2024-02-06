"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.usuariosGet);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.default
], usuarios_1.usuariosPut);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.default
], usuarios_1.usuariosPost);
router.delete('/:id', [
    validar_jwt_1.default,
    // esAdminRole,
    (0, validar_roles_1.tieneRole)('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.default
], usuarios_1.usuariosDelete);
router.patch('/', usuarios_1.usuariosPatch);
exports.default = router;
//# sourceMappingURL=usuarios.js.map