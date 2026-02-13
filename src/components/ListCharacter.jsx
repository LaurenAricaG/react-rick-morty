import { useState } from "react";
import CardCharacter from "./CardCharacter";

export const ListCharacter = ({ characters }) => {
  const [flippedId, setFlippedId] = useState(null);

  return (
    <section className="grid py-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CardCharacter
          key={character.id}
          character={character}
          flipped={flippedId === character.id}
          setFlippedId={setFlippedId}
        />
      ))}
    </section>
  );
};
