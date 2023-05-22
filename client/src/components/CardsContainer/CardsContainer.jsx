import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Buttons from "../Buttons/Buttons";
import Pagination from "../Pagination/Pagination";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  const groupSize = 5;
  const totalPages = Math.ceil(recipes.length / groupSize);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const renderCards = () => {
    const startIndex = currentPage * groupSize;
    const endIndex = startIndex + groupSize;
    const currentGroup = recipes.slice(startIndex, endIndex);
    return currentGroup.map((recipe) => (
      <Card
        id={recipe.id}
        key={recipe.id}
        title={recipe.title}
        image={recipe.image}
        diets={recipe.diets}
        healthScore={recipe.healthScore}
      />
    ));
  };

  return (
    <div className={style.mainCont}>
    <div className={style.CardsContainer}>
      <h2>Choose your recipe</h2>
      <div className={style.CardGroup}>{renderCards()}</div>
      <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      <div className={style.footer}>
       <div className={style.searchBar}> <SearchBar/> </div>
      <div><Buttons/></div>
      </div>
    </div>
    </div>
  );
};

export default CardsContainer;