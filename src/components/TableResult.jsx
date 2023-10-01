"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function TableResult() {
  const { contentQuery } = useSelector((state) => state.textArea);
  console.log("hola", contentQuery);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
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
                      return (
                        <td
                          key={index}
                          className="whitespace-nowrap p-4 text-sm text-gray-500"
                        >
                          <span className={`${(value == null) ? "text-red-700 italic":""} `}>{value !== null ? value : "NULL"}</span>
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
