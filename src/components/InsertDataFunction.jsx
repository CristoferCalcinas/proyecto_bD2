"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function InsertDataFunction({
  openParam,
  setOpenParam,
  dataInputFunction,
}) {
  const [inputValues, setInputValues] = useState({});
  const { userDatabase, passwordDatabase } = useSelector(
    (state) => state.textArea
  );

  const handleInputChange = (e, columnName) => {
    const newValue =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setInputValues({
      ...inputValues,
      [columnName]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);

    const keys = Object.keys(inputValues).join(",");
    const values = Object.values(inputValues)
      .map((value) => {
        if (typeof value === "string") {
          return `'${value}'`;
        } else if (typeof value === "number") {
          return value;
        } else {
          return "null";
        }
      })
      .join(",");

    const sql = `INSERT INTO ${dataInputFunction?.dataTableName} (${keys}) VALUES (${values});`;

    const resp = await fetch("http://localhost:3000/api/conectBack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consulta: sql,
        userDatabase,
        passwordDatabase,
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (data.length === 0) {
      toast.success("Datos insertados correctamente");
    } else {
      toast.error(data);
    }

    setOpenParam(false);
    setInputValues({});
  };
  return (
    <Transition.Root show={openParam} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenParam}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-7 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <AdjustmentsHorizontalIcon
                        className="h-6 w-6 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Insertar Datos: {dataInputFunction?.dataTableName}
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col gap-5">
                        {dataInputFunction?.dataInput?.map((data, index) => {
                          return (
                            <div key={index} className="flex justify-end">
                              <div className="mt-1 space-x-4">
                                <span className="text-sm text-gray-500">
                                  {data?.column_name}
                                </span>

                                <input
                                  className="bg-blue-100 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                  type={`${
                                    data?.data_type == "character varying"
                                      ? "text"
                                      : data?.data_type == "date"
                                      ? "date"
                                      : "number"
                                  }`}
                                  value={inputValues[data?.column_name] || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, data?.column_name)
                                  }
                                  placeholder={data?.data_type}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Insertar Datos
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
