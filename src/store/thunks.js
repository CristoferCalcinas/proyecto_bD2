import { enviarConsulta, errorServer } from "./textAreaSlicel"

export const enviarConsultaDB = (consulta) => {
    return async (dispatch) => {
        if (!consulta.length > 0) {
            dispatch(errorServer({ error: true, data: 'No se ha ingresado una consulta' }));
            return;
        };
        dispatch(enviarConsulta(consulta));
    }
}