const handleUserFormInput = () => {
  // const inputHeight = document.getElementById('input-height').value;
  // const inputWeight = document.getElementById('input-weight').value;
  // const inputAge = document.getElementById('input-age').value;

  // const inputGender = document
  //   .getElementById('genders')
  //   .querySelector('input[type="radio"]:checked').value;

  // const inputAcvity = document
  //   .getElementById('activity-levels')
  //   .querySelector('input[type="radio"]:checked').value;

  location.href = 'meal-plan.html';
  // writeQueryString({
  //   calories: calculateCalories(
  //     inputGender,
  //     inputHeight,
  //     inputWeight,
  //     inputAge,
  //     inputAcvity
  //   ),
  // });
  writeQueryString({ hello: 'world' });
};

const readUserInputFormIngredients = () => {
  const ingredients = document.getElementById('ingredients');
  // TODO: add format validation
};

const writeQueryString = (searchParams) => {
  const queryString = new URLSearchParams(searchParams);
  history.replaceState(
    '',
    '',
    `${window.location.pathname}?${queryString.toString()}`
  );
  console.log('window.location.pathname: ', window.location.pathname);
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

  let caloriesAmount = 0;
  if (gender === 'male') {
    caloriesAmount =
      (66.5 + 13.75 * weight + 5.003 * height - 6.75 * age) * bmrCoefficent;
  } else {
    caloriesAmount =
      (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * bmrCoefficent;
  }

  console.log(caloriesAmount);
};
