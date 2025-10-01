import { Schema, model, Model } from "mongoose";

const propertiesSchema = new Schema({
    name: {
        type: String,
        // required: [true, "The name is required"],
    },
    value: {
        type: Number,
    },
    img: {
        type: String,
        default: "",
    },


});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Properties: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Properties = model("properties");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    Properties = model("properties", propertiesSchema);
}

export default Properties;
