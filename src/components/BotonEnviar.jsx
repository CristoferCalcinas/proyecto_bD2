export default function BotonEnviar({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="rounded bg-indigo-50 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        onClick={onClick}
      >
        Ejecutar/Enviar
      </button>
    </div>
  );
}
