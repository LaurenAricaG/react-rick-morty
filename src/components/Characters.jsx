import axios from "axios";
import { useEffect, useState } from "react";
import { ListCharacter } from "./ListCharacter";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Characters = () => {
  const [allCharacters, setAllCharacters] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(({ data }) => {
        setAllCharacters(data.results);
        setTotalPages(data.info.pages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page]);

  return (
    <section className="p-4 py-5">
      <h1 className="pb-2 text-center text-3xl font-semibold text-slate-800 dark:text-slate-200">
        Rick and Morty
      </h1>
      <p className="mb-6 text-center text-slate-700 dark:text-slate-400">
        Encuentra tu personaje favorito
      </p>
      <div className="mx-auto max-w-7xl">
        <ListCharacter characters={allCharacters} />
        <div className="flex">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" /> Prev
            </button>
          )}

          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1 cursor-pointer"
            >
              Next <ArrowRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Characters;
