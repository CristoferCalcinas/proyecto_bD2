import { configureStore } from '@reduxjs/toolkit'
import { TextAreaSlice } from './textAreaSlicel'

export const store = configureStore({
  reducer: {
    textArea: TextAreaSlice.reducer,
  },
})