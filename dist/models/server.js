"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../database/config"));
const auth_1 = __importDefault(require("../routes/auth"));
const buscar_1 = __importDefault(require("../routes/buscar"));
const categorias_1 = __importDefault(require("../routes/categorias"));
const productos_1 = __importDefault(require("../routes/productos"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const cors_1 = __importDefault(require("cors"));
const fileUpload = require("express-fileupload");
class Server {
    constructor() {
        this.paths = {
            auth: "/api/auth",
            buscar: "/api/buscar",
            categorias: "/api/categorias",
            productos: "/api/productos",
            usuarios: "/api/usuarios",
            uploads: "/api/uploads",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio Público
        this.app.use(express_1.default.static("public"));
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use(this.paths.auth, auth_1.default);
        this.app.use(this.paths.buscar, buscar_1.default);
        this.app.use(this.paths.categorias, categorias_1.default);
        this.app.use(this.paths.productos, productos_1.default);
        this.app.use(this.paths.usuarios, usuarios_1.default);
        this.app.use(this.paths.uploads, uploads_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map