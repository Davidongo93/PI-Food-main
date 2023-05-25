import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const [recipes,diets] = useSelector((state) =>[state.recipes, state.diets]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(getRecipes())
        .then(() => {
          setLoading(false);

        })
        .catch((error) => {
          console.log("Error fetching recipes:", error.response.data);
          setLoading(false);
          alert (error.response.data.message)
        });
    }
    setLoading(false);
    if ( !diets || diets.length === 0){
      dispatch(getDiets())
    }
  }, [diets,dispatch,recipes.length]);
  return (
    <>
      {loading || recipes.length === 0 ? (
        <Loader />
      ) : (
        <CardsContainer />
      )}
    </>
  );
};

export default Home;
