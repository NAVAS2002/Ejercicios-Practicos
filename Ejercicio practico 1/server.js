const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//conexión a la base de datos
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
// Rutas para el CRUD de productos

app.post('/productos', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
