import { useParams } from "react-router-dom";

import { Card } from "primereact/card";
import { useQuery } from "@tanstack/react-query";

const FilmDetails = () => {
  const { id } = useParams();

  const { data: filmDetails, isLoading, isError } = useQuery({
    queryKey: ['filmDetails', id],
    queryFn: () => fetch(`https://swapi.info/api/films/${id}`).then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen text-white">
      <Card
        className="shadow-none !bg-[#121212]"
      >
        <div className="relative h-[450px] overflow-hidden [perspective:400px]">
          <div
            className="absolute
              bottom-0
              left-1/2
              w-[90%]
              max-w-4xl
              -translate-x-1/2
              origin-bottom
              rotate-x-[25deg]
              text-[#feda4a]
              text-xl
              md:text-2xl
              font-bold 
              leading-[1.8]
              tracking-wide
              text-justify
              drop-shadow-[0_0_6px_rgba(254,218,74,0.8)]"
          >
            <h2 className="text-center text-xl md:text-6xl mb-10">
              Episode {filmDetails.episode_id}
            </h2>

            <h1 className="text-center text-2xl md:text-7xl mb-16 uppercase">
              {filmDetails.title}
            </h1>

            <p>
              {filmDetails.opening_crawl}
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-10 text-gray-300">
          <p className="text-sm text-gray-400 mb-8">
          Released: {filmDetails.release_date}
        </p>
        <p><strong>Directed by {filmDetails.director}</strong></p>
          <p>
            <strong>Producer:</strong> {filmDetails.producer}
          </p>
          <p>
            <strong>Characters:</strong> {filmDetails.characters.length}
          </p>
          <p>
            <strong>Planets:</strong> {filmDetails.planets.length}
          </p>
          <p>
            <strong>Starships:</strong> {filmDetails.starships.length}
          </p>
          <p>
            <strong>Species:</strong> {filmDetails.species.length}
          </p>
          <p>
            <strong>Vehicles:</strong> {filmDetails.vehicles.length}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FilmDetails;