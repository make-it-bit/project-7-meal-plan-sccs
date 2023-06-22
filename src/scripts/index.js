const handleUserFormInput = () => {
  const inputHeight = document.getElementById('input-height').value;
  const inputWeight = document.getElementById('input-weight').value;
  const inputAge = document.getElementById('input-age').value;
  const inputGender = document
    .getElementById('genders')
    .querySelector('input[type="radio"]:checked').value;
  const inputAcvity = document
    .getElementById('activity-levels')
    .querySelector('input[type="radio"]:checked').value;
  const ingredients = document.getElementById('ingredients');
  // TODO: add validations for all fields (null check, format check)

  const caloriesAmount = calculateCalories(
    inputGender,
    inputHeight,
    inputWeight,
    inputAge,
    inputAcvity
  );
};
const calculateCalories = (gender, height, weight, age, activityLevel) => {
  let bmrCoefficent = 0;
  activityLevel = activityLevel.toLowerCase();
  switch (activityLevel) {
    case 'sedentary':
      bmrCoefficent = 1.2;
      break;
    case 'lightly active':
      bmrCoefficent = 1.375;
      break;
    case 'active':
      bmrCoefficent = 1.55;
      break;
    case 'very active':
      bmrCoefficent = 1.725;
      break;
    case 'extremely active':
      bmrCoefficent = 1.9;
      break;
  }

  if (gender === 'male') {
    return (
      (66.5 + 13.75 * weight + 5.003 * height - 6.75 * age) * bmrCoefficent
    );
  } else {
    return (
      (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * bmrCoefficent
    );
  }
};

const getRecepies = async (caloriesAmount, ingredients) => {
  const APP_ID = c34ab5d9;
  const APP_KEY = a7a5284e0132e033649dbbd050765bf7;
  const URL_BASE = 'https://api.edamam.com/api/recipes/v2?type=public';

  const url = `${URL_BASE}&q=${encodeURIComponent(
    ingredients
  )}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=Breakfast&calories=${caloriesAmount}`;

  console.log(url);
};
