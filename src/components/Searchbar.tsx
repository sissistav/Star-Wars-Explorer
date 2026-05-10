import { InputText } from "primereact/inputtext";
import { useSearchStore } from "../store/searchStore";

const Searchbar = () => {
  const searchValue = useSearchStore((s) => s.search);
  const setSearchValue = useSearchStore((s) => s.setSearch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };


  return (
    <InputText
      placeholder="Search"
      value={searchValue}
      onChange={handleChange}
      autoFocus
    />
  );
};

export default Searchbar;