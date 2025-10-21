
// Ejemplo de endpoint inseguro (NO USAR)
// Permite cualquier ruta y concatena sin validación
// app.get('/read', (req, res) => {
//   const file = req.query.file;
//   // ADVERTENCIA: Esto permite path traversal y fuga de archivos sensibles
//   try {
//     const content = fs.readFileSync(__dirname + '/' + file, 'utf8');
//     res.send(content);
//   } catch (err) {
//     // Ocultando errores en logs
//     res.status(404).send('Archivo no encontrado');
//   }
// });

// Solución responsable: Validar nombre, restringir directorio y usar path.resolve
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const SAFE_DIR = path.join(__dirname, 'archivos'); // Directorio seguro

// Endpoint seguro con validación y restricción de directorio
app.get('/download', (req, res) => {
  const file = req.query.file;
  // Validación básica: no permitir rutas con ..
  if (!file || /\.\./.test(file)) {
    // Comentario de advertencia: Intento de path traversal
    return res.status(400).send('Archivo no permitido');
  }
  const filePath = path.resolve(SAFE_DIR, file);
  if (!filePath.startsWith(SAFE_DIR)) {
    // Comentario de advertencia: Acceso fuera del directorio seguro
    return res.status(403).send('Acceso denegado');
  }
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (err) {
    // Ocultando detalles de error en logs
    res.status(404).send('Archivo no encontrado');
  }
});

app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));

// Comentarios de advertencia incluidos en el código para ilustrar riesgos y buenas prácticas.