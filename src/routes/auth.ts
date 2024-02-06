import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignin, validarTokenUsuario } from "../controllers/auth";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";




const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin);


router.get('/', [
    validarJWT
], validarTokenUsuario);



export default router;