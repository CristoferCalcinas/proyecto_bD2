import AddUserDatabase from "@/components/AddUserDatabase";
import { UserIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
  },
  {
    name: "Tom Cook",
    role: "Director of Product",
  },
];

export default function page() {
  return (
    <div className="mx-auto max-w-lg">
      <div>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
            Agregar nuevo usuario
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            En este apartado puedes agregar un nuevo usuario a la base de datos.
            Ojo solo puedes agregar, si quieres dar permisos de administrador
            necesitas usar el usuario postgres, que esta como{" "}
            <span className="font-extrabold italic text-red-800">
              superusuario.
            </span>
          </p>
        </div>
        <AddUserDatabase />
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">
          Usuarios existentes en la base de datos
        </h3>
        <ul
          role="list"
          className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
        >
          {people.map((person, personIdx) => (
            <li
              key={personIdx}
              className="flex items-center justify-between space-x-3 py-4"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <div className="flex-shrink-0">
                  <UserIcon className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center ring-8 ring-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="truncate text-sm font-medium text-gray-500">
                    {person.role}
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
                  <span className="sr-only">{person.name}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center my-5">
        <Link href="/">
          <span className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Hacer Consultas
          </span>
        </Link>
      </div>
    </div>
  );
}
