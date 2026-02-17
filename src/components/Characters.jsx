import axios from "axios";
import { useEffect, useState } from "react";
import { ListCharacter } from "./ListCharacter";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PER_PAGE = 10;

const Characters = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(1);

  const group_view = Math.ceil(totalPages / PER_PAGE);

  const start = (group - 1) * PER_PAGE + 1;
  const end = Math.min(group * PER_PAGE, totalPages);

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
      <h1 className="pb-2 text-center text-3xl font-semibold text-slate-800 ">
        Rick and Morty
      </h1>
      <p className="mb-6 text-center text-slate-700 ">
        Encuentra tu personaje favorito
      </p>
      <div className="mx-auto max-w-7xl">
        <ListCharacter characters={allCharacters} />

        <div className="flex gap-2 flex-wrap justify-center mt-6">
          <button
            onClick={() => setGroup((g) => Math.max(g - 1, 1))}
            disabled={group === 1}
            className="cursor-pointer bg-blue-600 rounded-2xl h-10 w-10 text- flex items-center justify-center text-white font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: end - start + 1 }, (_, i) => {
            const value = start + i;
            return (
              <button
                key={value}
                onClick={() => setPage(value)} // 👈 SOLO cambia page
                className={`${
                  page === value
                    ? "bg-teal-800"
                    : "bg-teal-700 hover:bg-teal-600"
                } rounded-2xl h-10 w-10 text-white font-semibold cursor-pointer`}
              >
                {value}
              </button>
            );
          })}

          <button
            onClick={() => setGroup((g) => (g < group_view ? g + 1 : g))}
            disabled={group === group_view}
            className="cursor-pointer bg-blue-600 rounded-2xl h-10 w-10 text- flex items-center justify-center text-white font-semibold"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="flex justify-center mt-2">
          <span className="text-sm font-semibold">
            Página {group} de {group_view}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Characters;
