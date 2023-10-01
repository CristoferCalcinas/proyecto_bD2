"use client";
import { addContentQuery, errorServer } from "@/store/textAreaSlicel";
import { enviarConsultaDB } from "@/store/thunks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BotonEnviar from "./BotonEnviar";
import { toast } from "sonner";

export default function TextArea() {
  const { valueTextArea, error, messageError } = useSelector(
    (state) => state.textArea
  );
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
      if (response.ok) {
        const data = await response.json();
        if (typeof data === "string") {
          dispatch(errorServer({ data, error: true }));
          toast.error(data);
        } else {
          dispatch(addContentQuery(data));
          toast.success("Consulta exitosa");
        }
        console.log(data); // Mostrar los datos en la consola
      } else {
        console.log("Error en la respuesta:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función para contar el número de líneas en el texto
  const countLines = (text) => {
    return text.split("\n").length;
  };
  // Calcula el número de líneas actual
  const lines = countLines(textArea);
  // Genera la enumeración de líneas
  const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);

  return (
    <div>
      <div className="flex justify-between">
        <label className="block text-xl font-medium leading-6 text-gray-900">
          Ingresa tu Consulta SQL
        </label>
        <BotonEnviar onSubmitDatabase={onSubmitDatabase} />
      </div>
      <div className="mt-2 flex">
        <div className="w-7 text-right text-gray-500 container py-5 flex flex-col justify-start items-center">
          {lineNumbers.map((lineNumber) => (
            <div key={lineNumber}>{lineNumber}</div>
          ))}
        </div>
        <textarea
          rows={10}
          className="block w-full rounded-md border-0 py-5 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-10 resize-none"
          value={textArea}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
