import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDiets } from "../../redux/actions";
import { useSelector } from "react-redux";

const Form = () => {
  //se hace dispatch a la action getDiets para traer las dietas disponibles
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getDiets())
  },[dispatch])
  const diets = useSelector((state) => state.diets);
  const [form, setForm] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    diets: [],
    analyzedInstructions: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
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
    console.log(form.diets);
};

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="title">Recipe title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
          />
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
        </div>
        <div>
          <label htmlFor="steps">Steps: </label>
          <input
            type="number"
            id="steps"
            name="steps"
            value={form.analyzedInstructions.length}
            min="0"
            onChange={(event) => {
              const { value } = event.target;
              const steps = [];
              for (let i = 0; i < value; i++) {
                steps.push({ number: i + 1, step: "" });
              }
              setForm({ ...form, analyzedInstructions: steps });
            }}
          />
        </div>
        {form.analyzedInstructions.map((step, index) => (
          <div key={index}>
            <label htmlFor={`step-${index + 1}`}>Step {index + 1}: </label>
            <input
              type="text"
              id={`step-${index + 1}`}
              name={`step-${index + 1}`}
              value={step.step}
              onChange={(event) => {
                const { value } = event.target;
                const updatedSteps = [...form.analyzedInstructions];
                updatedSteps[index].step = value;
                setForm({ ...form, analyzedInstructions: updatedSteps });
              }}
            />
          </div>
        ))}
      </form>
    </>
  );
};

export default Form;
