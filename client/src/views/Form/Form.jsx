/* 
import { useDispatch } from "react-redux";
import { getDiets } from "../../redux/actions";
import { useSelector } from "react-redux"; */
import { useEffect, useState } from "react";
import { validate } from "./validator";
import axios from "axios";
const Form = () => {
  //se hace dispatch a la action getDiets para traer las dietas disponibles
 /*  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getDiets())
  },[dispatch])
  const diets = useSelector((state) => state.diets); */

 const diets = [
      "dairy free",
      "fodmap friendly",
      "gluten free",
      "high protein",
      "ketogenic",
      "lacto ovo vegetarian",
      "paleolithic",
      "pescatarian",
      "primal",
      "vegan",
      "whole 30"
 ]

 const [form, setForm] = useState({
  title: "",
  image: "",
  summary: "",
  healthScore: "",
  diets: [],
  analyzedInstructions:[ {
    name: "",
    steps: [],
  }]
});


  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    diets:"",
    analyzedInstructions:"",
  })


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    const newErrors = validate({ ...form, [name]: value });
    setErrors(newErrors);
  };
  
 /*  useEffect(() => {
    const newErrors = validate(form);
    setErrors(newErrors);
    console.log(newErrors);
  }, [form]); */
  
  
const handleDietsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
        setForm((prevForm) => ({
            ...prevForm,
            diets: [...prevForm.diets, value],
        }));
    } else {
        setForm((prevForm) => ({
            ...prevForm,
            diets: prevForm.diets.filter((diet) => diet !== value),
          }));
    }
};

const handleStepChange = (index, value) => {
  const updatedSteps = { ...form.analyzedInstructions };
  updatedSteps[index] = {
    ...updatedSteps[index],
    step: value,
  };
  setForm({
    ...form,
    analyzedInstructions: updatedSteps,
  });
};




const submitHandler = (event) => {
  event.preventDefault();
  
  const analyzedInstructions = {
    name: "", // Agrega el nombre deseado para las instrucciones analizadas
    steps: Object.keys(form.analyzedInstructions).map((index) => ({
      number: parseInt(index),
      step: form.analyzedInstructions[index].step,
      ingredients: [], // Puedes agregar la lista de ingredientes correspondiente a cada paso
      equipment: [], // Puedes agregar la lista de equipos correspondiente a cada paso
    })),
  };

  const updatedForm = {
    ...form,
    analyzedInstructions,
  };

  console.log(updatedForm);

  axios
    .post("http://localhost:3001/recipes", updatedForm)
    .then((res) => alert(res))
    .catch((error) => alert(error));
};



  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Recipe title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
          />
          {errors.title && <span> {errors.title}</span>}
        </div>
        <div>
          <label htmlFor="image">Image URL: </label>
          <input
            type="text"
            id="image"
            name="image"
            value={form.image}
            onChange={handleInputChange}
          />
          {errors.image && <span> {errors.image}</span>}
        </div>
        <div>
          <label htmlFor="summary">Summary: </label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={form.summary}
            onChange={handleInputChange}
          />
          {errors.summary && <span> {errors.summary}</span>}
        </div>
        <div>
          <label htmlFor="healthScore">HealthScore (0-100): </label>
          <input
            type="number"
            id="healthScore"
            name="healthScore"
            value={form.healthScore}
            min="0"
            max="100"
            onChange={handleInputChange}
          />
          {errors.healthScore && <span> {errors.healthScore}</span>}
        </div>
        <div>
          <label htmlFor="">Diets: </label>
          {diets.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  checked={form.diets.includes(option)}
                  onChange={handleDietsChange}
                />
                {option}
              </label>
            </div>
          ))}
          {errors.diets && <span> {errors.diets}</span>}
        </div>
        <div>
  <label htmlFor="steps">Steps: </label>
  <input
    type="number"
    id="steps"
    name="steps"
    value={Object.keys(form.analyzedInstructions).length}
    min="0"
    onChange={(event) => {
      const { value } = event.target;
      const steps = {};
      for (let i = 0; i < value; i++) {
        steps[i + 1] = { step: "" };
      }
      setForm({ ...form, analyzedInstructions: steps });
    }}
  />
</div>
{errors.analyzedInstructions && <span> {errors.analyzedInstructions}</span>}
{Object.keys(form.analyzedInstructions).map((index) => (
  <div key={index}>
    <label htmlFor={`step-${index}`}>Step {index}: </label>
    <input
      type="text"
      id={`step-${index}`}
      name={`step-${index}`}
      value={form.analyzedInstructions[index].step}
      onChange={(event) => {
        const { value } = event.target;
        handleStepChange(index, value);
      }}
    />
  </div>
))}


        <button type="submit">Submit Recipe</button>
      </form>
    </>
  );
};

export default Form;
