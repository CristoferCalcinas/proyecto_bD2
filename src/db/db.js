import { Client } from 'pg';

// Configuración de la conexión a la base de datos
// const db = new Client({
//     user: 'user1', // 'postgres', 'usuariodeveloper', 'user1'
//     host: 'localhost',
//     database: 'Ejercicio',
//     password: 'user1', // '8066', 'passwordDeveloper', 'user1'
//     port: 4321,
// });

// db.connect();

// export default db;

export const userDatabase = (userName, password) => {
    const db_user = new Client({
        user: userName,
        host: 'localhost',
        database: 'restaurante', // restaurante
        password: password,
        port: 4321,
    });
    db_user.connect();
    return db_user;
}