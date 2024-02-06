import { NextFunction, response } from "express";

const validarArchivoSubir = (req: any, res = response, next: NextFunction) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: "No hay archivos que subir - validarArchivoSubir",
    });
  }

  next();
};

export default validarArchivoSubir;
