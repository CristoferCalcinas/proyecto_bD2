"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { showTablesDataBase } from "@/db/showTables";
import { handleTableQuery } from "@/db/handleTableQuery";
import { useDispatch } from "react-redux";
import { addContentQuery } from "@/store/textAreaSlicel";
import { toast } from "sonner";
import ChangeUserMode from "./ChangeUserMode";

export default function SideBar({ children }) {
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ObjectBrowserPanel, setObjectBrowserPanel] = useState({
    dataNameDataBase: null,
    dataTables: null,
  });

  const fetchData = async () => {
    try {
      const { dataNameDataBase, dataTables } = await showTablesDataBase();
      setObjectBrowserPanel({
        dataNameDataBase,
        dataTables,
      });
    } catch (error) {
      console.error("Error al actualizar las tablas:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const dispatch = useDispatch();

  const handleConsult = async (tableName) => {
    const resp = await handleTableQuery(tableName);
    dispatch(addContentQuery({ data: resp, error: false, messageError: "" }));
  };
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4 pt-10">
                    <nav className="flex flex-1 flex-col"></nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4 pt-10">
            <nav className="flex flex-1 flex-col">
              <div role="list" className="flex flex-1 flex-col gap-y-7">
                <div>
                  <header>
                    <h2 className="text-xl font-extrabold text-indigo-200 uppercase tracking-wider mb-10">
                      Base de Datos
                    </h2>

                    <div className="my-5 flex justify-between">
                      {ObjectBrowserPanel.dataNameDataBase &&
                        ObjectBrowserPanel.dataNameDataBase.map(
                          (data, index) => {
                            return (
                              <div key={index}>
                                <h3 className="text-xl font-bold text-white tracking-widest flex justify-center items-center">
                                  <span className="text-xs font-normal tracking-normal mr-2">
                                    DB:{"   "}
                                  </span>
                                  {data.current_database}
                                </h3>
                              </div>
                            );
                          }
                        )}
                      <button
                        onClick={() => {
                          fetchData();
                          toast.success("Actualizado con éxito");
                        }}
                      >
                        <ArrowPathIcon className="h-6 w-6 text-indigo-200 hover:text-white hover:transform hover:scale-125 transition-all duration-300 ease-in-out" />
                      </button>
                    </div>
                  </header>
                  <main>
                    <span className="text-xs font-normal tracking-normal text-white">
                      TABLAS:{" "}
                    </span>
                    <div className="space-y-2 flex flex-col mt-2">
                      {ObjectBrowserPanel.dataTables &&
                        ObjectBrowserPanel.dataTables.map(
                          (dataTables, index) => {
                            return (
                              <div
                                key={index}
                                className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 text-center"
                                onClick={() =>
                                  handleConsult(dataTables?.tablename)
                                }
                              >
                                <h3 className="text-sm font-medium text-white tracking-widest">
                                  {dataTables.tablename}
                                </h3>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </main>
                </div>

                <div className="mt-auto">
                  <button
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                    onClick={() => {
                      setOpenConfigDialog(true);
                    }}
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Configuración
                    {openConfigDialog && (
                      <ChangeUserMode
                        openParam={openConfigDialog}
                        setOpenParam={setOpenConfigDialog}
                      />
                    )}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-center">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="font-bold text-2xl">
              <h3>Base de Datos</h3>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
