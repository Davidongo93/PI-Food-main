import { useDispatch } from "react-redux";
import { getDiets } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { validate } from "./validator";
import axios from "axios";
import style from "./Form.module.css";


const Form = () => {

/* const dispatch = useDispatch();
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
    analyzedInstructions: []
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    diets: "",
    analyzedInstructions: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
    const newErrors = validate({
      ...form,
      [name]: value
    });
    setErrors(newErrors);
  };

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
  
    const newErrors = validate({ ...form, diets: form.diets }); // Validar solo las dietas
    setErrors(newErrors);
  };
  

  const handleStepsChange = (event) => {
    const { value } = event.target;
    const stepsCount = parseInt(value);

    if (!isNaN(stepsCount) && stepsCount >= 0) {
      const updatedSteps = [];

      for (let i = 0; i < stepsCount; i++) {
        updatedSteps.push({ step: "" });
      }

      setForm((prevForm) => ({
        ...prevForm,
        analyzedInstructions: updatedSteps
      }));
    }
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...form.analyzedInstructions];
    updatedSteps[index] = { step: value };

    setForm((prevForm) => ({
      ...prevForm,
      analyzedInstructions: updatedSteps
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
  
    const analyzedInstructions = [
      {
        name: "",
        steps: form.analyzedInstructions.map((step, index) => ({
          number: index + 1,
          step: step.step,
          ingredients: [],
          equipment: [],
        })),
      },
    ];
  
    const updatedForm = {
      ...form,
      analyzedInstructions,
    };

    axios
      .post("http://localhost:3001/recipes", updatedForm)
      .then((res) => alert(`Success!!\n${res.statusText}\nID:${res.data[0].id}\n${res.data[0].title}`))
      .catch((error) => alert(`ERROR\nStatus: ${error.response.status}\nMessage: ${error.response.data.error}`));
  };
  

  return (
    <>
    <div className={style.mainCont}>
      <div className={style.formContainer}>
        <h3>Create a new recipe</h3>
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
        <div className={style.dietsBoxes}>
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
            value={form.analyzedInstructions.length}
            min="0"
            onChange={handleStepsChange}
          />
        </div>
        {errors.analyzedInstructions && (
          <span> {errors.analyzedInstructions}</span>
        )}
        {form.analyzedInstructions.map((step, index) => (
          <div key={index}>
            <label htmlFor={`step-${index}`}>Step {index + 1}: </label>
            <input
              type="text"
              id={`step-${index}`}
              name={`step-${index}`}
              value={step.step}
              onChange={(event) =>
                handleStepChange(index, event.target.value)
              }
            />
          </div>
        ))}
            <button type="submit" disabled={Object.values(errors).some((error) => error !== "")}>
              Submit Recipe
            </button>

         </form>
       </div>
      </div>
    </>
  );
};

export default Form;
