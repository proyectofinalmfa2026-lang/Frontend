export default function MovieSearch() {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Buscar películas..."
        className="
          w-full
          bg-[#0E0A2B]
          border
          border-[#22194A]
          rounded-xl
          px-4
          py-3
          text-[#D6D0DC]
          placeholder:text-[#7B7497]
          focus:outline-none
          focus:border-[#8C63C9]
        "
      />
    </div>
  );
}
