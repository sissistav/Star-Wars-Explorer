import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";

interface Film {
  episode_id: number;
  title: string;
  release_date: string;
}

interface Character {
  name: string;
  gender: string;
}

const Favourites = () => {
  const { data: films = [], isLoading: filmsLoading, isError: filmsError } = useQuery({
    queryKey: ['films'],
    queryFn: () => fetch("https://swapi.info/api/films").then((res) => res.json()),
  });

  const { data: characters = [], isLoading: charactersLoading, isError: charactersError } = useQuery({
    queryKey: ['characters'],
    queryFn: () => fetch("https://swapi.info/api/people").then((res) => res.json()),
  });

  const favouriteFilms = films.filter((_: Film, index: number) =>
    localStorage.getItem(`film-liked-${index + 1}`) === 'true'
  );

  const favouriteCharacters = characters.filter((character: Character) =>
    localStorage.getItem(`character-liked-${character.name}`) === 'true'
  );

  if (filmsLoading || charactersLoading) return <p>Loading...</p>;
  if (filmsError || charactersError) return <p>Something went wrong.</p>;

  return (
    <div className="p-4">
      <h2 className="text-yellow-200 text-2xl mb-4">Favourite Films</h2>
      {favouriteFilms.length === 0
        ? <p className="text-gray-400 mb-8">No favourite films yet.</p>
        : <div className="flex flex-wrap mb-8">
            {favouriteFilms.map((film: Film, index: number) => (
              <div key={film.episode_id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                <Link to={`/films/${index + 1}`}>
                  <Card
                    title={film.title}
                    subTitle={film.release_date}
                    className="w-full cursor-pointer hover:scale-105 transition-transform"
                  />
                </Link>
              </div>
            ))}
          </div>
      }

      <h2 className="text-yellow-200 text-2xl mb-4">Favourite Characters</h2>
      {favouriteCharacters.length === 0
        ? <p className="text-gray-400">No favourite characters yet.</p>
        : <div className="flex flex-wrap">
            {favouriteCharacters.map((character: Character) => (
              <div key={character.name} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                <Card
                  title={character.name}
                  subTitle={character.gender}
                  className="w-full"
                />
              </div>
            ))}
          </div>
      }
    </div>
  );
};

export default Favourites;