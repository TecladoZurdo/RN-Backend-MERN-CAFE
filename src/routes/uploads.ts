import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos";
import { coleccionesPermitidas } from "../helpers/db-validators";
import { actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads";
import validarArchivoSubir from "../middlewares/validar-archivo";



const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)
// ], actualizarImagen )

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)



export default router;