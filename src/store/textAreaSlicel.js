import { createSlice } from '@reduxjs/toolkit';

export const TextAreaSlice = createSlice({
    name: 'TextArea',
    initialState: {
        valueTextArea: 'SELECT * FROM estudiantes1',
        error: false,
        messageError: null,
        contentQuery: null
    },
    reducers: {
        enviarConsulta: (state, { payload }) => {
            state.valueTextArea = payload;
        },
        errorServer: (state, { payload }) => {
            state.error = payload.error;
            state.messageError = payload.data;
        },
        addContentQuery: (state, { payload }) => {
            state.contentQuery = payload;

        }
    }
});


// Action creators are generated for each case reducer function
export const { enviarConsulta, errorServer, addContentQuery } = TextAreaSlice.actions;