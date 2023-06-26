const loadMealTypeFromLocalStorage = (mealType) => {
  const item = localStorage.getItem(mealType);

  if (item) {
    const mealJson = JSON.parse(item);
    console.log('mealJson: ', mealJson);

    const mealPlanContainer = document.getElementById('meal-plan-container');
    mealPlanContainer.appendChild(
      Object.assign(document.createElement('span'), {
        className: 'meal-plan-top-label',
        innerHTML: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      })
    );

    const mealContainer = Object.assign(document.createElement('div'), {
      className: 'meal-container',
    });
    mealPlanContainer.appendChild(mealContainer);

    mealContainer.appendChild(
      Object.assign(document.createElement('div'), {
        className: 'dish-name-container',
        innerHTML: `<span>${mealJson['recipe']['label']}</span>`,
      })
    );

    mealContainer.appendChild(
      Object.assign(document.createElement('div'), {
        className: 'meal-plan-container-left',
        innerHTML: `<span>Calories: ${mealJson['recipe']['calories']}</span><span>Cuisine type: ${mealJson['recipe']['cuisineType']}</span>`,
      })
    );

    const mealPlanContent = Object.assign(document.createElement('div'), {
      className: 'meal-plan-content',
    });
    mealContainer.appendChild(mealPlanContent);

    const ingredients = Object.assign(document.createElement('div'), {
      className: 'meal-plan-container-right',
      innerHTML: '<span class="ingredients-label">Ingredients</span>',
    });
    for (let ingredient of mealJson['recipe']['ingredientLines']) {
      ingredients.innerHTML += `<span>${ingredient}</span>`;
    }
    mealPlanContent.appendChild(ingredients);

    mealPlanContent.appendChild(
      Object.assign(document.createElement('div'), {
        className: 'meal-plan-img-container',
        innerHTML: `<img src="${mealJson['recipe']['images']['SMALL']['url']}"/>`,
      })
    );

    const digest = Object.assign(document.createElement('div'), {
      className: 'meal-digest-container',
    });

    digest.appendChild(
      Object.assign(document.createElement('button'), {
        className: 'accordion',
        innerHTML: 'Meal digest',
      })
    );

    const panel = Object.assign(document.createElement('div'), {
      className: 'panel',
    });

    const digestTable = document.createElement('table');
    const headerRow = digestTable.insertRow();
    const labelHeader = headerRow.insertCell();
    labelHeader.innerHTML = 'Label';
    const amountHeader = headerRow.insertCell();
    amountHeader.innerHTML = 'Amount';

    for (let elem of mealJson['recipe']['digest']) {
      const row = digestTable.insertRow();
      const labelCell = row.insertCell();
      labelCell.innerHTML = elem['label'];
      const amountCell = row.insertCell();
      amountCell.innerHTML = elem['total'];
    }

    panel.appendChild(digestTable);
    digest.appendChild(panel);
    mealContainer.appendChild(digest);

    handleAccordions();
  }
};
