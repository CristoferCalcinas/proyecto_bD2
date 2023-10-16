import db, { userDatabase } from '@/db/db';

// export async function enviarQuery(query) {
//     console.log("Consulta recibida:", query);  // Imprimir la consulta recibida
//     try {
//         console.log("****************db*****************")
//         console.log(db)
//         console.log("****************db*****************")
//         const queryResult = await db.query(query);
//         console.log("Resultado de la consulta:", queryResult);
//         const results = queryResult.rows;
//         return results;
//     } catch (error) {
//         // console.log('Errorrrrrrr:', error);
//         //console.log(error)
//         return error.message;
//     }
// }


export async function enviarQueryUser(query, userName, password) {
    console.log("Consulta recibida:", query);  // Imprimir la consulta recibida
    try {
        const db_user = userDatabase(userName, password);
        const queryResult = await db_user.query(query);
        console.log("Resultado de la consulta:", queryResult);
        const results = queryResult.rows;
        return results;
    } catch (error) {
        // console.log('Errorrrrrrr:', error);
        //console.log(error)
        return error.message;
    }
}