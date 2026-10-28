const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/productos').then(() => {
    console.log('Conexión a la base de datos establecida');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    categoria: String
});

const Producto = mongoose.model('Producto', productoSchema);


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
