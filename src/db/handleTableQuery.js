export const handleTableQuery = async (tableName) => {
    const apiUrl = 'http://localhost:3000/api/conectBack';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: `SELECT * FROM ${tableName};`,
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