import { useState } from "react";
import { findRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const handleSearch = () => {
    dispatch(findRecipes(title));
  }

const handleInputChange = (event) => {
  setTitle(event.target.value);
}



  return (
    <>
    <input type="text" value={title} onChange={handleInputChange} placeholder="Buscar..." />
    <button onClick={handleSearch}>Buscar</button>

    </>
  );
}

export default SearchBar;
