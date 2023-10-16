export const handleTableQuery = async (tableName, userDatabase, passwordDatabase) => {
    const apiUrl = 'http://localhost:3000/api/conectBack';
    const consulta = `SELECT * FROM ${tableName}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ consulta, userDatabase, passwordDatabase }),
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud de la API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}