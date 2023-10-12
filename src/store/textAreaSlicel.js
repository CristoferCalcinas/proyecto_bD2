import { createSlice } from '@reduxjs/toolkit';

export const TextAreaSlice = createSlice({
    name: 'TextArea',
    initialState: {
        valueTextArea: 'SELECT * FROM estudiantes1;',
        error: false,
        messageError: "",
        contentQuery: null,
        userDatabase: "postgres",
        passwordDatabase: "8066",
    },
    reducers: {
        enviarConsulta: (state, { payload }) => {
            state.valueTextArea = payload;
            state.error = false;
            state.messageError = "";
            state.contentQuery = null;
        },
        errorServer: (state, { payload }) => {
            state.valueTextArea = "";
            state.error = payload.error;
            state.messageError = payload.data;
            state.contentQuery = null;
        },
        addContentQuery: (state, { payload }) => {
            state.valueTextArea = "";
            state.error = payload.messageError;
            state.contentQuery = payload.data;
            state.messageError = payload.message;

        },
        changeUserDatabase: (state, { payload }) => {
            state.userDatabase = payload.changeUser;
            state.passwordDatabase = payload.changePassword;
            state.valueTextArea = "";
            state.error = false;
            state.messageError = "";
        },
    }
});


// Action creators are generated for each case reducer function
export const { enviarConsulta, errorServer, addContentQuery } = TextAreaSlice.actions;