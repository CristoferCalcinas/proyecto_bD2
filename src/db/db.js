import { Client } from 'pg';

// Configuración de la conexión a la base de datos
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Ejercicio',
    password: '8066',
    port: 4321,
});

db.connect();

export default db;
