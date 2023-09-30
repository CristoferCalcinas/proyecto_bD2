import db from '@/db/db';

export async function enviarQuery(query) {
    console.log("Consulta recibida:", query);  // Imprimir la consulta recibida
    try {
        const queryResult = await db.query(query);
        console.log("Resultado de la consulta:", queryResult);
        const results = queryResult.rows;
        return results;
    } catch (error) {
        // console.log('Errorrrrrrr:', error);
        //console.log(error)
        return error.message;
    }
}
