import { useQuery } from "@tanstack/react-query";

interface SpeciesProps {
  urls: string[];
}

const Species = ({ urls }: SpeciesProps) => {
  const { data: species } = useQuery({
    queryKey: ['species', urls[0]],
    queryFn: () => fetch(urls[0]).then((res) => res.json()),
    enabled: !!urls[0],
  });

  if (!urls[0]) return <span>Human</span>;
  if (!species) return <span>Loading...</span>;

  return <span>{species.name}</span>;
};

export default Species;