import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";

interface Film {
  episode_id: number;
  title: string;
  release_date: string;
}

const Favourites = () => {
  const { data: films = [], isLoading, isError } = useQuery({
    queryKey: ['films'],
    queryFn: () => fetch("https://swapi.info/api/films").then((res) => res.json()),
  });

  const favourites = films.filter((_: Film, index: number) => {
    const id = index + 1;
    return localStorage.getItem(`film-liked-${id}`) === 'true';
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (favourites.length === 0) return <p>No liked films yet.</p>;

  return (
    <>
        <div className="flex flex-wrap justify-around p-6">
        {favourites.map((film: Film, index: number) => (
            <Link to={`/films/${index + 1}`} key={film.episode_id}>
            <div className="flex justify-center pb-4 cursor-pointer hover:scale-105 transition-transform">
                <Card
                title={film.title}
                subTitle={film.release_date}
                className="w-[400px]">
                </Card>
            </div>
            </Link>
        ))}
        </div>
    </>
  );
};

export default Favourites;