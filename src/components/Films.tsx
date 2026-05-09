import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    <div className="flex justify-center pb-4">
      <Link to={`/films/${id}`}>
        <Card
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
          title={film.title}
          subTitle={film.release_date}
          className="w-[400px]">
        </Card>
      </Link>
    </div>
  );
};

const Films = () => {
  const { data: films = [], isLoading, isError } = useQuery({
    queryKey: ['films'],
    queryFn: () => fetch("https://swapi.info/api/films").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="flex flex-wrap justify-around">
      {films.map((film: Film, index: number) => (
        <FilmCard key={film.episode_id} film={film} index={index} />
      ))}
    </div>
  );
};

export default Films;