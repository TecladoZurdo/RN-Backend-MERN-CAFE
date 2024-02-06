import { Schema, model } from "mongoose";

interface IUsuario {
  nombre: string;
  correo: string;
  password: string;
  img: string;
  rol: string;
  estado: boolean;
  google: boolean;
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  //usuario.uid = _id;
  return usuario;
}

export default model<IUsuario>("Usuario", UsuarioSchema);


