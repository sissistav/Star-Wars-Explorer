import { useState } from "react";

import { useQuery } from '@tanstack/react-query';

import { Card } from 'primereact/card';
import { Paginator } from "primereact/paginator";


const Characters = () => {
  const [first, setFirst] = useState(0);
  const rows = 6;

  const { data: characters = [], isLoading, isError } = useQuery({
    queryKey: ['characters'],
    queryFn: () => fetch("https://swapi.info/api/people").then((res) => res.json()),
  });

  const paginated = characters.slice(first, first + rows);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <>
    <div className="flex flex-wrap justify-around pb-4">
      {paginated.map((character: any) => (
      <div className="flex flex-wrap pb-4" key={character.name}>
          <Card
            title={character.name}
            subTitle={character.gender}
            className="w-[400px]">
          </Card>
        </div>
      ))}
    </div>
    <Paginator
        className="fixed bottom-0 left-0 w-full"
        first={first}
        rows={rows}
        totalRecords={characters.length}
        onPageChange={(e) => setFirst(e.first)}
      />
    </>
  );
};

export default Characters;