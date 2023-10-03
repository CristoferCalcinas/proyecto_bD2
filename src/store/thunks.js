import { enviarConsulta } from "./textAreaSlicel"

export const enviarConsultaDB = (consulta) => {
    return async (dispatch) => {      
        dispatch(enviarConsulta(consulta));
    }
}