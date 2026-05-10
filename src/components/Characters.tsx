import { useState } from "react";
import { useQuery } from '@tanstack/react-query';

import Species from "./Species";
import { useSearchStore } from "../store/searchStore";
import { PageEmpty, PageError, PageLoading } from "./QueryStates";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Paginator } from "primereact/paginator";
interface Character {
  name: string;
  gender: string;
  species: string[];
}

const CharacterCard = ({
  character,
}: {
  character: Character;
}) => {
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`character-liked-${character.name}`) === 'true';
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`character-liked-${character.name}`, String(newLiked));
  };

  return (
    <Card
      title={character.name}
      subTitle={character.gender}
      className="w-[400px]"
      pt={{ body: { className: '!pt-0' } }}
      header={
        <Button
          icon={liked ? "pi pi-heart-fill" : "pi pi-heart"}
          rounded
          text
          aria-label="Favourite"
          onClick={handleLike}
          style={{ color: 'yellow' }}
          pt={{ root: { style: { color: 'yellow' } } }}
        />
      }>
      <p>
        Species: <Species urls={character.species} />
      </p>
    </Card>
  );
};

const Characters = () => {
  const search = useSearchStore((s) => s.search);
  const [first, setFirst] = useState(0);
  const rows = 9;

  const { data: characters = [], isLoading, isError } = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: () => fetch("https://swapi.info/api/people").then((res) => res.json()),
  });

  const filtered = characters.filter((character) =>
    character.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(first, first + rows);

  if (isLoading) return <PageLoading label="Loading characters…" />;
  if (isError) return <PageError />;

  if (filtered.length === 0) {
    const fromApi = characters.length === 0;
    return (
      <PageEmpty
        title={fromApi ? "No characters available" : "No characters match your search"}
        detail={
          fromApi
            ? undefined
            : search.trim()
              ? `Try a different term than “${search.trim()}”.`
              : "Try another search."
        }
      />
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {paginated.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
            />
          ))}
        </div>
      </div>

      <Paginator
        className="!mt-auto"
        first={first}
        rows={rows}
        totalRecords={filtered.length}
        onPageChange={(e) => setFirst(e.first)}
      />
    </>
  );
};

export default Characters;