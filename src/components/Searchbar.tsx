import { useState } from "react";
import { InputText } from "primereact/inputtext";

const Searchbar = ({ onSearchChange }: { onSearchChange?: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState("");
  // const [isSearchBarVisible, setSearchBarVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

//   const toggleSearchBar = () => {
//     setSearchBarVisible(!isSearchBarVisible);
//   };

  // const handleBlur = () => {
  //   if (searchValue.trim() === "") {
  //     setSearchBarVisible(false);
  //   }
  // };

  return (
    <div>
      {/* {!isSearchBarVisible && (
        <Button
          icon="pi pi-search"
          rounded
          text
          severity="success"
          aria-label="Search"
          onClick={toggleSearchBar}
        />
      )} */}
        <InputText
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
          autoFocus
        />
    </div>
  );
};

export default Searchbar;