import { Schema, model } from "mongoose";

interface ICategoria extends Document {
  nombre: string;
  estado: boolean;
  usuario: Schema.Types.ObjectId; // Asegúrate de importar Schema desde mongoose
}

const CategoriaSchema = new Schema<ICategoria>({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export default model<ICategoria>("Categoria", CategoriaSchema);
