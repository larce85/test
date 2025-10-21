// Ejemplo de mitigación de SQL Injection en Node.js

// Alternativa B: Usando parámetros en la consulta
conn.execute("SELECT * FROM users WHERE user=?", [username]);

// Alternativa C: Usando mysql.format para parametrizar la consulta
const sql = mysql.format("SELECT * FROM users WHERE user = ?", [username]);
conn.query(sql);

// Ambas alternativas previenen la inyección de SQL al no concatenar directamente los valores de usuario en la consulta.