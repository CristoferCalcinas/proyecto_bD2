const apiUrl = 'http://localhost:3000/api/conectBack';

const fetchData = async (consulta, userDatabase, passwordDatabase) => {
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
};

export const showTablesDataBase = async (userDatabase, passwordDatabase) => {
    const queryTables = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';";
    const queryName = "SELECT current_database();";

    try {
        const [dataTables, dataNameDataBase] = await Promise.all([
            fetchData(queryTables, userDatabase, passwordDatabase),
            fetchData(queryName, userDatabase, passwordDatabase),
        ]);
        return { dataTables, dataNameDataBase };
    } catch (error) {
        // Manejar errores aquí según sea necesario.
        return { dataTables: [], dataNameDataBase: [] };
    }
};
