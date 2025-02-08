// Importación de módulos
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Se crea una instancia de Express
const app = express();
const PORT = 3000;

// Habilitar CORS para permitir peticiones
app.use(cors());

// Configurar Multer para guardar archivos en la carpeta "upload"
const storage = multer.diskStorage({
    destination: 'upload/', // Carpeta donde se guardarán los archivos
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombra el archivo con la fecha actual
    }
});

const upload = multer({ storage });

// Ruta para subir archivos con método POST
app.post('/upload', upload.single('archivo'), (req, res) => {
    if (!req.file) {
        return res.status(500).json({ error: 'No se subió ningún archivo' });
    }
    res.json({ mensaje: 'Archivo subido correctamente', nombre: req.file.filename });
});

// Ruta para obtener la lista de canciones disponibles con método GET
app.get('/canciones', (req, res) => {
    fs.readdir('upload/', (err, archivos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer la carpeta' });
        }
        res.json(archivos);
    });
});

// Archivos estáticos para poder reproducir
app.use('/upload', express.static('upload'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





