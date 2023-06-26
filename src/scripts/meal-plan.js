const loadMealTypeFromLocalStorage = (mealType) => {
  const item = localStorage.getItem(mealType);

  if (item) {
    const meal = JSON.parse(item);
    console.log(meal);
  }
};
