export default function AddUserDatabase() {
  return (
    <form action="#" className="mt-6 flex">
      <label htmlFor="newUser" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        name="newUser"
        id="newUser"
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Ingresa un nuevo usuario"
      />
      <button
        // type="submit"
        className="ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Crear nuevo usuario
      </button>
    </form>
  );
}
