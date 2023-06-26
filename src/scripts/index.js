const getUserInputHeight = () => {
  return new Promise((resolve, reject) => {
    const inputHeight = document.getElementById('input-height').value;

    if (!Number(inputHeight)) {
      reject('Height must be a numeric value');
    } else if (inputHeight < 0) {
      reject('Height must be greater than 0');
    } else {
      resolve(inputHeight);
    }
  });
};

const getUserInputWeight = () => {
  return new Promise((resolve, reject) => {
    const inputWeight = document.getElementById('input-weight').value;

    if (!Number(inputWeight)) {
      reject('Weight must be a numeric value');
    } else if (inputWeight < 0) {
      reject('Weight must be greater than 0');
    } else {
      resolve(inputWeight);
    }
  });
};

const getUserInputAge = () => {
  return new Promise((resolve, reject) => {
    const inputAge = document.getElementById('input-age').value;

    if (!Number(inputAge)) {
      reject('Age must be a numeric value');
    } else if (inputAge < 0) {
      reject('Age must be greater than 0');
    } else {
      resolve(inputAge);
    }
  });
};

const getUserInputGender = () => {
  return new Promise((resolve, reject) => {
    try {
      const inputGender = document
        .getElementById('genders')
        .querySelector('input[type="radio"]:checked').value;
      resolve(inputGender);
    } catch (error) {
      reject('Please specify your gender');
    }
  });
};

const getUserInputActivity = () => {
  return new Promise((resolve, reject) => {
    try {
      const inputAcvityLevel = document
        .getElementById('activity-levels')
        .querySelector('input[type="radio"]:checked').value;
      resolve(inputAcvityLevel);
    } catch (error) {
      reject('Please specify activity level');
    }
  });
};

const getUserInputIngredients = () => {
  return new Promise((resolve, reject) => {
    const inputIngredients = document.getElementById('ingredients').value;
    if (inputIngredients) {
      resolve(inputIngredients);
    }
    reject('Please enter at least one valid ingredient');
  });
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

const fetchRecepy = async (mealType) => {
  const APP_ID = 'c34ab5d9';
  const APP_KEY = 'a7a5284e0132e033649dbbd050765bf7';
  const URL_BASE = 'https://api.edamam.com/api/recipes/v2?type=public';

  try {
    const height = await getUserInputHeight();
    const weight = await getUserInputWeight();
    const age = await getUserInputAge();
    const gender = await getUserInputGender();
    const activityLevel = await getUserInputActivity();
    const ingredients = await getUserInputIngredients();
    hideErrorMessage();

    const caloriesAmount = calculateCalories(
      gender,
      height,
      weight,
      age,
      activityLevel
    );

    if (caloriesAmount) {
      const url = `${URL_BASE}&q=${encodeURIComponent(
        ingredients
      )}&app_id=${APP_ID}&app_key=${APP_KEY}&imageSize=REGULAR&mealType=${mealType}&calories=${caloriesAmount}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        hideErrorMessage();
        return data['hits'][0];
      } catch (error) {
        showErrorMessage(`Could not get data`);
      }
    }
  } catch (error) {
    showErrorMessage(error);
  }
};

const getThreeMealRecepies = async () => {
  const breakfast = await fetchRecepy('Breakfast');
  if (breakfast) {
    localStorage.setItem('breakfast', JSON.stringify(breakfast));
  }
};

const redirectToPage = () => {
  location.href = '/meal-plan.html';
};
