"use client";

import { useEffect, useState } from "react";
import { UserIcon, LockOpenIcon } from "@heroicons/react/20/solid";

export default function ShowUsersDatabase() {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [openModal, setOpenModal] = useState({
    open: false,
    user: "",
  });
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

  const changeLoginUser = (nameUser) => {
    setOpenModal({
      open: true,
      user: nameUser,
    });
  };

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
                  className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => changeLoginUser(person.usename)}
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
      <ModalChangeUser openP={openModal} setOpen={setOpenModal} />
    </div>
  );
}

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ModalChangeUser({ openP: { open, user }, setOpen }) {
  const [textInput, setTextInput] = useState("");
  const cancelButtonRef = useRef(null);

  const onInputChange = (event) => {
    setTextInput(event.target.value);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen({ open: false, user: "" })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Usuario : {user}
                    </Dialog.Title>
                    <div className="mt-2 space-y-5">
                      <p className="text-sm text-gray-500">
                        ¿Estas seguro que quieres cambiar de usuario?
                      </p>
                      <p className="text-sm text-gray-500">
                        Si es asi porfavor ingrese la contraseña del usuario
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center my-5 space-x-2">
                  <span>Contraceña: </span>
                  <input
                    type="text"
                    className="rounded-lg border-2 border-red-500 focus:border-blue-500 outline-none px-2"
                    value={textInput}
                    onChange={onInputChange}
                    // onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <button
                    // type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                    onClick={() => setOpen({ open: false, user: "" })}
                    ref={cancelButtonRef}
                  >
                    Cambiar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
