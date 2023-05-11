/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
    "title": "Broccolini Quinoa Pilaf mandinga la monda",
    "image": "https://spoonacular.com/recipeImages/715769-312x231.jpg",
    "summary": "Broccolini Quinoa Pilaf requires approximately <b>30 minutes</b> from start to finish. For <b>$4.14 per serving</b>, you get a main course that serves 2. One portion of this dish contains around <b>20g of protein</b>, <b>31g of fat</b>, and a total of <b>625 calories</b>. Head to the store and pick up vegetable broth, onion, olive oil, and a few other things to make it today. A few people made this recipe, and 94 would say it hit the spot. It is a <b>rather expensive</b> recipe for fans of Mediterranean food. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. It is brought to you by Pick Fresh Foods. With a spoonacular <b>score of 98%</b>, this dish is excellent. Similar recipes are <a href=\"https://spoonacular.com/recipes/spring-broccolini-kale-quinoa-bowls-734866\">Spring Broccolini & Kale Quinoa Bowls</a>, <a href=\"https://spoonacular.com/recipes/orange-sesame-salmon-with-quinoa-broccolini-839832\">Orange-Sesame Salmon with Quinoa & Broccolini</a>, and <a href=\"https://spoonacular.com/recipes/black-pepper-goat-cheese-and-chard-quinoa-with-roasted-broccolini-625829\">Black Pepper Goat Cheese and Chard Quinoa with Roasted Broccolini</a>.",
      "healthScore": 74,
    "diets": [
    "gluten free",
    "dairy free",
    "paleolithic",
    "whole 30"
    ],
    "analyzedInstructions": [
    {
    "name": "",
    "steps": [
    {
    "number": 1,
    "step": "In a large pan with lid heat olive oil over medium high heat.",
    "ingredients": [
    {
    "id": 4053,
    "name": "olive oil",
    "localizedName": "olive oil",
    "image": "olive-oil.jpg"
    }
    ],
    "equipment": [
    {
    "id": 404645,
    "name": "frying pan",
    "localizedName": "frying pan",
    "image": "pan.png"
    }
    ]
    },
    {
    "number": 2,
    "step": "Add onions and cook for 1 minute.",
    "ingredients": [
    {
    "id": 11282,
    "name": "onion",
    "localizedName": "onion",
    "image": "brown-onion.png"
    }
    ],
    "equipment": [],
    "length": {
    "number": 1,
    "unit": "minutes"
    }
    },
    {
    "number": 3,
    "step": "Add garlic and cook until onions are translucent and garlic is fragrant.",
    "ingredients": [
    {
    "id": 11215,
    "name": "garlic",
    "localizedName": "garlic",
    "image": "garlic.png"
    },
    {
    "id": 11282,
    "name": "onion",
    "localizedName": "onion",
    "image": "brown-onion.png"
    }
    ],
    "equipment": []
    },
    {
    "number": 4,
    "step": "Add quinoa to pan, stir to combine. Slowly add in broth and bring to a boil.Cover and reduce heat to low, cook for 15 minutes.In the last 2-3 minutes of cooking add in broccolini on top of the quinoa (do not stir) and cover.Uncover and toss broccolini and quinoa together.Season to taste with salt and pepper.",
    "ingredients": [
    {
    "id": 1102047,
    "name": "salt and pepper",
    "localizedName": "salt and pepper",
    "image": "salt-and-pepper.jpg"
    },
    {
    "id": 98840,
    "name": "broccolini",
    "localizedName": "broccolini",
    "image": "broccolini.jpg"
    },
    {
    "id": 20035,
    "name": "quinoa",
    "localizedName": "quinoa",
    "image": "uncooked-quinoa.png"
    },
    {
    "id": 1006615,
    "name": "broth",
    "localizedName": "broth",
    "image": "chicken-broth.png"
    }
    ],
    "equipment": [
    {
    "id": 404645,
    "name": "frying pan",
    "localizedName": "frying pan",
    "image": "pan.png"
    }
    ],
    "length": {
    "number": 18,
    "unit": "minutes"
    }
    },
    {
    "number": 5,
    "step": "Add walnuts and serve hot.",
    "ingredients": [
    {
    "id": 12155,
    "name": "walnuts",
    "localizedName": "walnuts",
    "image": "walnuts.jpg"
    }
    ],
    "equipment": []
    }
    ]
    }
    ]
    };

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});
