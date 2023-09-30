export default function BotonEnviar({ onSubmitDatabase }) {
  return (
    <div>
      <button
        type="button"
        className="rounded bg-indigo-50 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        onClick={onSubmitDatabase}
      >
        Ejecutar/Enviar
      </button>
    </div>
  );
}
