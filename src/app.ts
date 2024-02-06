import colors from "colors";
import dotenv from "dotenv";
import Server from "./models/server";

dotenv.config();

console.log('Hola efra');
const server = new Server();

server.listen();
