async function getUser(id) {
    try {
        const usuarios = obtenerUsuarios();
        const usuario = usuarios.find(u => u.id === id);
        if (!usuario) throw new Error("Usuario no encontrado");
        return { nombre: usuario.nombre, email: usuario.email };
    } catch (error) {
        return { error: error.message };
    }
}