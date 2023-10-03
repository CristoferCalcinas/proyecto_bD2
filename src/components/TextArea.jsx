"use client";
import { addContentQuery, errorServer } from "@/store/textAreaSlicel";
import { enviarConsultaDB } from "@/store/thunks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BotonEnviar from "./BotonEnviar";
import { toast } from "sonner";

export default function TextArea() {
  // Obtiene el valor del área de texto del estado global
  const { valueTextArea } = useSelector((state) => state.textArea);
  const dispatch = useDispatch();
  const [textArea, settextArea] = useState(valueTextArea);

  /**
   * Maneja el evento de cambio en el área de texto.
   *
   * @param {Event} e - El evento de cambio en el área de texto.
   */
  const onChange = (e) => {
    settextArea(e.target.value);
  };

  /**
   * Envía la consulta actual al servidor backend.
   * Realiza una solicitud POST al servidor con el contenido del área de texto.
   * Maneja la respuesta del servidor y actualiza el estado en consecuencia.
   */
  const onSubmitDatabase = async () => {
    if (textArea === "") return toast.error("No hay consulta para enviar");
    dispatch(enviarConsultaDB(textArea));
    try {
      const consultas = textArea.split(";").map((query) => query.trim());

      // Eliminar consultas vacías
      const consultasValidas = consultas.filter((query) => query.length > 0);
      console.log("consultasValidas");
      console.log(consultasValidas);

      // enviar las consultas una por una al backend
      for (const consulta of consultasValidas) {
        const response = await fetch("http://localhost:3000/api/conectBack", {
          method: "POST",
          body: consulta,
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
            dispatch(addContentQuery({ data, error: false, messageError: "" }));
            toast.success("Consulta exitosa");
          }
          console.log(data); // Mostrar los datos en la consola
        } else {
          console.log("Error en la respuesta:", response.status);
        }
      }

      // const response = await fetch("http://localhost:3000/api/conectBack", {
      //   method: "POST",
      //   body: textArea,
      //   headers: {
      //     "Content-Type": "text/plain",
      //   },
      // });
      // if (response.ok) {
      //   const data = await response.json();
      //   if (typeof data === "string") {
      //     dispatch(errorServer({ data, error: true }));
      //     toast.error(data);
      //   } else {
      //     dispatch(addContentQuery({ data, error: false, messageError: "" }));
      //     toast.success("Consulta exitosa");
      //   }
      //   console.log(data); // Mostrar los datos en la consola
      // } else {
      //   console.log("Error en la respuesta:", response.status);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Cuenta el número de líneas en el texto.
   *
   * @param {string} text - El texto para contar las líneas.
   * @returns {number} El número de líneas en el texto.
   */
  const countLines = (text) => {
    return text.split("\n").length;
  };
  // Calcula el número de líneas actual
  const lines = countLines(textArea);
  // Genera la enumeración de líneas
  const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);

  /**
   * Maneja la presión de la tecla Tab en el área de texto.
   * Agrega una tabulación en lugar de cambiar el foco.
   *
   * @param {KeyboardEvent} e - El evento de presión de tecla.
   */
  const handleTabKeyPress = (e) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Evita el comportamiento predeterminado de cambiar de foco
      const { selectionStart, selectionEnd } = e.target;
      const newValue =
        textArea.substring(0, selectionStart) +
        "\t" +
        textArea.substring(selectionEnd);
      settextArea(newValue);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <label className="block text-xl font-medium leading-6 text-gray-900">
          Ingresa tu Consulta SQL
        </label>
        <BotonEnviar onSubmitDatabase={onSubmitDatabase} />
      </div>
      <div className="mt-2 flex">
        <div className="w-7 text-right text-gray-800 container py-5 flex flex-col justify-start items-center font-bold">
          {lineNumbers.map((lineNumber) => (
            <div key={lineNumber}>{lineNumber}</div>
          ))}
        </div>
        <textarea
          rows={10}
          className="block w-full rounded-md border-0 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6 p-5 resize-none tracking-widest font-bold"
          value={textArea}
          onChange={onChange}
          onKeyDown={handleTabKeyPress}
        />
      </div>
    </div>
  );
}
