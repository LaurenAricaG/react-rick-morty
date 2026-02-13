const CardCharacter = ({ character, flipped, setFlippedId }) => {
  const statusColor =
    character.status === "Alive"
      ? "bg-emerald-500"
      : character.status === "Dead"
        ? "bg-red-500"
        : "bg-gray-400";

  const handleClick = () => {
    setFlippedId(flipped ? null : character.id);
  };

  return (
    <article
      onClick={handleClick}
      style={{ perspective: "1000px" }}
      className={`cursor-pointer relative group rounded-2xl overflow-hidden shadow-md transition-all duration-500 max-w-sm mx-auto w-full ${
        !flipped ? "hover:shadow-2xl hover:-translate-y-2" : ""
      }`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-1200 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
          flipped ? "transform-[rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div style={{ backfaceVisibility: "hidden" }}>
          {/* Imagen */}
          <div className="h-96 w-full overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <span
            className={`absolute top-4 right-4 ${statusColor} text-white text-xs px-3 py-1 rounded-full font-medium shadow-md z-10`}
          >
            {character.status}
          </span>

          <div className="absolute bottom-0 w-full backdrop-blur-md bg-white/20 border-t border-white/20 z-10">
            <h3 className="text-white text-lg font-semibold text-center py-3 tracking-wide">
              {character.name}
            </h3>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl flex flex-col justify-between"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              {character.name}
            </h3>

            <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
              #{character.id}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-700 mb-4" />

          {/* Info grid */}
          <div className="space-y-4 text-sm">
            {[
              { label: "Status", value: character.status },
              { label: "Species", value: character.species },
              { label: "Gender", value: character.gender },
              { label: "Origin", value: character.origin.name },
              { label: "Location", value: character.location.name },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-slate-800/60 px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                <span className="text-slate-400 text-xs tracking-wide uppercase">
                  {item.label}
                </span>

                <span className="text-white font-medium text-right max-w-[60%] truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="mt-6 h-1 w-16 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full self-center" />
        </div>
      </div>
    </article>
  );
};

export default CardCharacter;
