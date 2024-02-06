import { Router } from "express";

const { buscar } = require('../controllers/buscar');

const router = Router();


router.get('/:coleccion/:termino', buscar)




export default router;