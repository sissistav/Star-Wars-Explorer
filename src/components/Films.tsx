import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchStore } from "../store/searchStore";

interface Film {
  episode_id: number;
  title: string;
  release_date: string;
}

const FilmCard = ({ film, index }: { film: Film; index: number }) => {
  const id = index + 1;
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`film-liked-${id}`) === 'true';
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`film-liked-${id}`, String(newLiked));
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
      <Link to={`/films/${id}`}>
        <Card
          title={film.title}
          subTitle={film.release_date}
          className="w-full cursor-pointer hover:scale-105 transition-transform"
          pt={{ body: { className: '!pt-0' } }}
          header={
            <Button
              icon={liked ? "pi pi-heart-fill" : "pi pi-heart"}
              rounded
              text
              aria-label="Favorite"
              onClick={handleLike}
              style={{ color: 'yellow' }}
              pt={{ root: { style: { color: 'yellow' } } }}
            />
          }
        />
      </Link>
    </div>
  );
};

const Films = () => {
  const search = useSearchStore((s) => s.search);
  const { data: films = [], isLoading, isError } = useQuery<Film[]>({
    queryKey: ['films'],
    queryFn: () => fetch("https://swapi.info/api/films").then((res) => res.json()),
  });

  const filtered = films.filter((film) =>
    film.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="flex flex-wrap px-2">
      {filtered.map((film: Film, index: number) => (
        <FilmCard key={film.episode_id} film={film} index={index} />
      ))}
    </div>
  );
};

export default Films;