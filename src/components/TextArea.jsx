"use client";
import { enviarConsultaDB } from "@/store/thunks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TextArea() {
  const { valueTextArea } = useSelector((state) => state.textArea);
  const dispatch = useDispatch();
  const [textArea, settextArea] = useState(valueTextArea);
  const onChange = (e) => {
    settextArea(e.target.value);
  };

  
  const onSubmitDatabase = async () => {
    dispatch(enviarConsultaDB(textArea));
    try {
      // Get
      // const response = await fetch("http://localhost:3000/api/conectBack", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // Post
      const response = await fetch("http://localhost:3000/api/conectBack", {
        method: "POST",
        body: textArea,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="block text-xl font-medium leading-6 text-gray-900">
        Ingresa tu Consulta SQL
      </label>
      <div className="mt-2">
        <textarea
          rows={10}
          className="block w-full rounded-md border-0 py-1.5 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-10"
          defaultValue={textArea}
          onChange={onChange}
        />
      </div>
      <button
        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={onSubmitDatabase}
      >
        <span>Enviar</span>
      </button>
    </div>
  );
}
