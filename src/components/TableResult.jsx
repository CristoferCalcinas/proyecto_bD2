"use client";
import { addContentQuery } from "@/store/textAreaSlicel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TableResult() {
  const { contentQuery } = useSelector((state) => state.textArea);
  const dispatch = useDispatch();
  const [Tables, setTables] = useState([]);
  const viewExistingTables = async () => {
    const resp = await fetch("http://localhost:3000/api/conectBack", {
      method: "POST",
      body: "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const data = await resp.json();
    setTables(data);
  };

  const handleTableQuery = async (tableName) => {
    const resp = await fetch("http://localhost:3000/api/conectBack", {
      method: "POST",
      body: `SELECT * FROM ${tableName};`,
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const data = await resp.json();
    dispatch(addContentQuery({ data, error: false, messageError: "" }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-bold leading-6 text-gray-900 text-center">
            Tablas Existentes
          </h2>
          <div
            className={`flex justify-between text-center mt-5 
          ${Tables?.length > 0 ? "" : "hidden"}`}
          >
            {Tables?.map((table, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleTableQuery(table?.tablename)}
                >
                  <span className="font-bold ">Tabla - {index + 1}</span>
                  <p>{table.tablename}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={viewExistingTables}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ver Tablas Existentes
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  {contentQuery?.[0] &&
                    Object.keys(contentQuery[0]).map((key, index) => {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {key}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {contentQuery?.map((person, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    {Object.values(person).map((value, index) => {
                      let displayValue = value;

                      if (value === null) {
                        displayValue = "NULL";
                      } else if (typeof value === "boolean") {
                        displayValue = value ? "TRUE" : "FALSE";
                      }

                      return (
                        <td
                          key={index}
                          className="whitespace-nowrap p-4 text-sm text-gray-500"
                        >
                          <span
                            className={`${
                              value === null ? "text-red-700 italic" : ""
                            }`}
                          >
                            {displayValue}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
