import { createSlice } from '@reduxjs/toolkit';

export const TextAreaSlice = createSlice({
    name: 'TextArea',
    initialState: {
        valueTextArea: 'SELECT * FROM estudiantes1',
    },
    reducers: {
        enviarConsulta: (state, { payload }) => {
            state.valueTextArea = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { enviarConsulta } = TextAreaSlice.actions;