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
};

const getUserInputHeight = () => {
  const inputHeight = document.getElementById('input-height').value;

  if (!Number(inputHeight)) {
    showErrorMessage('Height must be a numeric value');
  } else if (inputHeight < 0) {
    showErrorMessage('Height must be greater than 0');
  } else return inputHeight;
};

const getUserInputWeight = () => {
  const inputWeight = document.getElementById('input-weight').value;

  if (!Number(inputWeight)) {
    showErrorMessage('Weight must be a numeric value');
  } else if (inputWeight < 0) {
    showErrorMessage('Weight must be greater than 0');
  } else return inputWeight;
};

const getUserInputAge = () => {
  const inputAge = document.getElementById('input-age').value;

  if (!Number(inputAge)) {
    showErrorMessage('Age must be a numeric value');
  } else if (inputAge < 0) {
    showErrorMessage('Age must be greater than 0');
  } else return inputAge;
};

const getUserInputGender = () => {
  return document
    .getElementById('genders')
    .querySelector('input[type="radio"]:checked').value;
};

const getUserInputActivity = () => {
  return document
    .getElementById('activity-levels')
    .querySelector('input[type="radio"]:checked').value;
};

const getUserInputIngredients = () => {
  return document.getElementById('ingredients');
};

const showErrorMessage = (message) => {
  const errorContainer = document.getElementById('error-container');
  errorContainer.style.display = 'block';
  errorContainer.innerHTML = message;
};

const hideErrorMessage = () => {
  document.getElementById('error-container').style.display = 'none';
};

const calculateCalories = (gender, height, weight, age, activityLevel) => {
  if (gender && height && weight && age && activityLevel) {
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
    }
    if (gender === 'female') {
      return (
        (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * bmrCoefficent
      );
    }
  }
};

const getRecepies = async () => {
  const APP_ID = 'c34ab5d9';
  const APP_KEY = 'a7a5284e0132e033649dbbd050765bf7';
  const URL_BASE = 'https://api.edamam.com/api/recipes/v2?type=public';

  // const caloriesAmount = calculateCalories(
  //   getUserInputGender(),
  //   getUserInputHeight(),
  //   getUserInputWeight(),
  //   getUserInputAge(),
  //   getUserInputActivity()
  // );
  caloriesAmount = 2000;
  const ingredients = 'chicken salad potato';

  if (caloriesAmount) {
    const url = `${URL_BASE}&q=${encodeURIComponent(
      ingredients
    )}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=Breakfast&calories=${caloriesAmount}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      hideErrorMessage();
      console.log(data);
      return data;
    } catch (error) {
      showErrorMessage(`Could not get data`);
    }
  }
};

const redirectToPage = () => {
  location.href = '/meal-plan.html';
};
