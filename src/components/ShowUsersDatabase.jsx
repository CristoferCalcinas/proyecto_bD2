"use client";

import { useEffect, useState } from "react";
import { UserIcon, LockOpenIcon } from "@heroicons/react/20/solid";

export default function ShowUsersDatabase() {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  useEffect(() => {
    const getPeople = async () => {
      const resp = await fetch("http://localhost:3000/api/conectBack", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: `SELECT * FROM pg_catalog.pg_user;`,
      });
      const data = await resp.json();
      setUsers(data); // Actualiza el estado con los datos de la respuesta
    };

    getPeople(); // Llama a la función al montar el componente
  }, []); // [] significa que se ejecutará solo una vez al montar el componente

  return (
    <div>
      <ul
        role="list"
        className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
      >
        {users?.map((person, personIdx) => {
          return (
            <li
              key={personIdx}
              className="flex items-center justify-between space-x-3 py-4"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-6">
                <div className="flex-shrink-0">
                  <UserIcon className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center ring-8 ring-white" />
                </div>
                <div className="min-w-0 flex flex-col ">
                  <p className="truncate font-bold text-gray-900 tracking-widest">
                    <span className="text-sm font-normal">
                      Nombre del usuario:{" "}
                    </span>
                    {person.usename}
                  </p>
                  <p className="truncate text-sm font-medium text-gray-500 text-center">
                    <span className="text-sm font-normal">ID: </span>
                    {person.usesysid}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900"
                >
                  <LockOpenIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Ingresar
                  <span className="sr-only">{person.usename}</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
