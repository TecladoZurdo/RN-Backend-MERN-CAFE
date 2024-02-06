import { Schema, model } from "mongoose";

interface IProducto {
    nombre: string;
    estado: boolean;
    usuario: string;
    precio: number;
    categoria: string;
    descripcion: string;
    disponible: boolean;
    img: string;
}

const ProductoSchema = new Schema<IProducto>({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, defult: true },
    img: { type: String },
});


ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


export default model<IProducto>('Producto', ProductoSchema);
