import { Schema, model } from "mongoose";

interface IRole {
    rol: string;
}

const RoleSchema = new Schema<IRole>({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

export default model<IRole>('Role', RoleSchema);
