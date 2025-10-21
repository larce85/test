// Ejemplo seguro para mitigar XSS en Express

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Uso en una ruta Express
app.get('/saludo', (req, res) => {
    const name = req.query.name || "Invitado";
    res.send(`<h1>Hola ${escapeHtml(name)}</h1>`);
});

// Así se evita la ejecución de código malicioso enviado por el usuario.