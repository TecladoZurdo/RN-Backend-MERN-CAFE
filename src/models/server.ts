import express, { Application } from "express";
import dbConnection from "../database/config";
import authRoutes from '../routes/auth';
import buscarRoutes from "../routes/buscar";
import categoriasRoutes from "../routes/categorias";
import productosRoutes from "../routes/productos";
import usuariosRoutes from "../routes/usuarios";
import uploadsRoutes from "../routes/uploads";
import cors from 'cors';
const fileUpload = require("express-fileupload");


class Server {

  private app: Application;
  private port: string;
  private paths = {
    auth: "/api/auth",
    buscar: "/api/buscar",
    categorias: "/api/categorias",
    productos: "/api/productos",
    usuarios: "/api/usuarios",
    uploads: "/api/uploads",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.buscar, buscarRoutes);
    this.app.use(this.paths.categorias, categoriasRoutes);
    this.app.use(this.paths.productos, productosRoutes);
    this.app.use(this.paths.usuarios, usuariosRoutes);
    this.app.use(this.paths.uploads, uploadsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

export default Server;