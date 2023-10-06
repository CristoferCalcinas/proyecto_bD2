"use client";

import { useSelector } from "react-redux";

export default function TableResult() {
  const { contentQuery } = useSelector((state) => state.textArea);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
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
